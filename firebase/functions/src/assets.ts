import sharp, { type FitEnum } from 'sharp';
import Application from './app';
import { getDownloadURL } from 'firebase-admin/storage';
import path from 'path';
import { File } from '@google-cloud/storage';
import { FieldValue } from 'firebase-admin/firestore';
import { murl } from './utils/murl';
import type {
  AssetsFolderData,
  AssetsFileData,
  AssetsImageSize,
  AssetsFileDataThumbnails,
  AssetsFileDataOriginal,
  AssetFileType,
} from '../shared/documents';
import { compact, converter } from './utils/firestore';
import { StorageObjectData } from 'firebase-functions/v2/storage';

const imageContentTypes = ['image/jpeg', 'image/png', 'image/gif'];

type OriginalPattern = {
  folder: string;
  file: string;
};

const originalPattern = murl<OriginalPattern>('assets/{folder}/{file}');

export class AssetsService {
  readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  folder(name: string) {
    return new GalleryService(this, name);
  }

  resolvePathForOriginal(path: string): OriginalPattern | undefined {
    const hash = originalPattern(path);
    if (!hash) {
      return undefined;
    }
    return hash;
  }

  async onStorageObjectFinalized(data: StorageObjectData): Promise<boolean> {
    const { name, contentType, size } = data;
    const resolved = this.resolvePathForOriginal(name);
    if (!resolved) {
      return false;
    }
    const folder = this.folder(resolved.folder);
    await folder.onStorageFileFinalized(resolved.file, contentType, size);
    return true;
  }

  async onFileCreated({ folder, file }: { folder: string; file: string }) {
    await this.folder(folder).onFileCreated(file);
  }

  async onFileDeleted({ folder, file }: { folder: string; file: string }) {
    await this.folder(folder).onFileDeleted(file);
  }
}

type ThumbnailDefinition = { id: AssetsImageSize; width: number; height: number; fit: keyof FitEnum };

const thumbnails: ThumbnailDefinition[] = [
  { id: '2048x2048', width: 2048, height: 2048, fit: 'inside' },
  { id: '120x120', width: 120, height: 120, fit: 'inside' },
];

export class GalleryService {
  private readonly galleries: AssetsService;
  private readonly name: string;

  constructor(galleries: AssetsService, name: string) {
    this.galleries = galleries;
    this.name = name;
  }

  private get app() {
    return this.galleries.app;
  }

  private get bucket() {
    return this.app.bucket;
  }

  private get firestore() {
    return this.app.firestore;
  }

  private assetsRef() {
    return this.firestore.doc(`assets/${this.name}`).withConverter(converter<AssetsFolderData>());
  }

  private filesRef() {
    return this.firestore.collection(`assets/${this.name}/files`).withConverter(converter<AssetsFileData>());
  }

  private fileRef(name: string) {
    return this.filesRef().doc(name);
  }

  private async maybeCreateFolder() {
    const name = this.name;
    const ref = this.assetsRef();
    try {
      await ref.create({
        name,
        files: 0,
      });
    } catch (err: unknown) {
      // @ts-expect-error error code
      if (err && err.code !== 6) {
        throw err;
      }
    }
    return ref;
  }

  private async updateFilesCount() {
    const imagesSnap = await this.filesRef().select().get();
    const files = imagesSnap.docs.length;
    try {
      await this.assetsRef().update({
        files,
      });
    } catch (err: unknown) {
      this.app.logger.info('assets.update-file-count failed', err);
    }
  }

  private pathForOriginal(name: string) {
    return `assets/${this.name}/${name}`;
  }

  private pathForThumbnail(original: string, id: string) {
    const { name } = path.parse(original);
    return `assets/${this.name}/thumbnails/${name}-${id}.jpeg`;
  }

  private async resolveOriginalImage(original: File, buffer: Buffer) {
    const [url, metadata] = await Promise.all([getDownloadURL(original), sharp(buffer).metadata()]);

    const size = {
      width: metadata.width!,
      height: metadata.height!,
    };

    return {
      url,
      size,
    };
  }

  private async createImageThumbnails(name: string, original: Buffer) {
    const bucket = this.bucket;
    const array = await Promise.all(
      thumbnails.map(async ({ width, height, fit, id }) => {
        const { data, info } = await sharp(original)
          .resize({
            width,
            height,
            fit,
            withoutEnlargement: true,
          })
          .jpeg({ quality: 80 })
          .toBuffer({ resolveWithObject: true });
        const size = { width: info.width, height: info.height };
        const file = bucket.file(this.pathForThumbnail(name, id));
        this.app.logger.info('assets.create-thumbnail', this.name, file.name);
        await file.save(data, {
          resumable: false,
          contentType: 'image/jpeg',
        });
        const url = await getDownloadURL(file);
        return {
          id,
          size,
          url,
        };
      }),
    );

    return array.reduce((hash, { id, size, url }) => {
      hash[id] = { size, url };
      return hash;
    }, {}) as AssetsFileDataThumbnails;
  }

  private async createFileDoc({
    name,
    contentType,
    type,
    size,
    original,
    thumbnails,
  }: {
    name: string;
    contentType: string;
    size: number;
    type: AssetFileType;
    original: AssetsFileDataOriginal;
    thumbnails?: AssetsFileDataThumbnails;
  }) {
    const ref = this.fileRef(name);
    this.app.logger.info('assets.create-file-doc', ref.path);

    await ref.set(
      compact({
        name,
        contentType,
        type,
        original,
        thumbnails,
        size,
        createdAt: FieldValue.serverTimestamp(),
      }),
    );
    return ref;
  }

  private async createFolderAndFileDoc({
    name,
    contentType,
    type,
    size,
    original,
    thumbnails,
  }: {
    name: string;
    contentType: string;
    type: AssetFileType;
    size: number;
    original: AssetsFileDataOriginal;
    thumbnails?: AssetsFileDataThumbnails;
  }) {
    const [gallery, file] = await Promise.all([
      this.maybeCreateFolder(),
      this.createFileDoc({ name, type, contentType, size, original, thumbnails }),
    ]);

    return { gallery, file };
  }

  isImage(contentType: string) {
    return imageContentTypes.includes(contentType);
  }

  async onStorageFileFinalized(name: string, contentType: string | undefined, size: number) {
    this.app.logger.info('assets.on-file-finalized', this.name, name);
    const bucket = this.bucket;
    const path = this.pathForOriginal(name);
    const file = bucket.file(path);
    if (contentType) {
      let original: AssetsFileDataOriginal;
      let thumbnails: AssetsFileDataThumbnails | undefined;
      let type: AssetFileType;
      if (this.isImage(contentType)) {
        const [buffer] = await file.download();
        [original, thumbnails] = await Promise.all([
          this.resolveOriginalImage(file, buffer),
          this.createImageThumbnails(name, buffer),
        ]);
        type = 'image';
      } else {
        original = {
          url: await getDownloadURL(file),
        };
        type = 'other';
      }

      return await this.createFolderAndFileDoc({
        name,
        contentType,
        type,
        size,
        original,
        thumbnails,
      });
    }
    return undefined;
  }

  private async deleteStorageFile(file: File) {
    this.app.logger.info('assets.delete-file', this.name, file.name);
    try {
      await file.delete();
    } catch (err: unknown) {
      // @ts-expect-error error
      if (err && err.code === 404) {
        return;
      }
      throw err;
    }
  }

  private async deleteStorageThumbnails(name: string) {
    const bucket = this.bucket;
    await Promise.all(
      thumbnails.map(async ({ id }) => {
        const file = bucket.file(this.pathForThumbnail(name, id));
        await this.deleteStorageFile(file);
      }),
    );
  }

  private async deleteStorageOriginal(name: string) {
    const bucket = this.bucket;
    const file = bucket.file(this.pathForOriginal(name));
    await this.deleteStorageFile(file);
  }

  async onFileDeleted(name: string) {
    this.app.logger.info('assets.on-file-deleted', this.name, name);
    await Promise.all([this.deleteStorageThumbnails(name), this.deleteStorageOriginal(name), this.updateFilesCount()]);
  }

  async onFileCreated(name: string) {
    this.app.logger.info('assets.on-file-created', this.name, name);
    await this.updateFilesCount();
  }
}
