import sharp, { type FitEnum } from 'sharp';
import Application from './app';
import { getDownloadURL } from 'firebase-admin/storage';
import path from 'path';
import { File } from '@google-cloud/storage';
import { FieldValue } from 'firebase-admin/firestore';
import { murl } from './utils/murl';
import type {
  GalleryData,
  GalleryImageData,
  GalleryImageDataImageInfo,
  GalleryImageSize,
  GalleryImageDataThumbnails,
} from '../shared/documents';
import { converter } from './utils/converter';

type OriginalPattern = {
  gallery: string;
  file: string;
};

const originalPattern = murl<OriginalPattern>('galleries/{gallery}/{file}');

export class GalleriesService {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  gallery(name: string) {
    return new GalleryService(this, name);
  }

  resolvePathForOriginal(path: string): OriginalPattern | undefined {
    const hash = originalPattern(path);
    if (!hash) {
      return undefined;
    }
    return hash;
  }

  async onObjectFinalized(path: string, contentType: string | undefined): Promise<boolean> {
    if (!contentType?.startsWith('image/')) {
      return false;
    }
    const resolved = this.resolvePathForOriginal(path);
    if (!resolved) {
      return false;
    }
    const gallery = this.gallery(resolved.gallery);
    await gallery.onImageFinalized(resolved.file);
    return true;
  }

  async onObjectDeleted(path: string): Promise<boolean> {
    const resolved = this.resolvePathForOriginal(path);
    if (!resolved) {
      return false;
    }
    const gallery = this.gallery(resolved.gallery);
    await gallery.onImageDeleted(resolved.file);
    return true;
  }

  async onImageCreated({ gallery }: { gallery: string; image: string }) {
    await this.gallery(gallery).updateImageCount();
  }

  async onImageDeleted({ gallery, image }: { gallery: string; image: string }) {
    await this.gallery(gallery).onImageDeleted(image);
  }
}

type ThumbnailDefinition = { id: GalleryImageSize; width: number; height: number; fit: keyof FitEnum };

const thumbnails: ThumbnailDefinition[] = [
  { id: '2048x2048', width: 2048, height: 2048, fit: 'inside' },
  { id: '120x120', width: 120, height: 120, fit: 'inside' },
];

export class GalleryService {
  galleries: GalleriesService;
  name: string;

  constructor(galleries: GalleriesService, name: string) {
    this.galleries = galleries;
    this.name = name;
  }

  get app() {
    return this.galleries.app;
  }

  get bucket() {
    return this.app.bucket;
  }

  get firestore() {
    return this.app.firestore;
  }

  galleryRef() {
    return this.firestore.doc(`galleries/${this.name}`).withConverter(converter<GalleryData>());
  }

  imagesRef() {
    return this.firestore.collection(`galleries/${this.name}/images`).withConverter(converter<GalleryImageData>());
  }

  imageRef(name: string) {
    return this.imagesRef().doc(name);
  }

  async _maybeCreateGallery() {
    const name = this.name;
    const ref = this.galleryRef();
    try {
      await ref.create({
        name,
        images: 0,
      });
    } catch (err: unknown) {
      // @ts-expect-error error code
      if (err && err.code !== 6) {
        throw err;
      }
    }
    return ref;
  }

  async updateImageCount() {
    const imagesSnap = await this.imagesRef().select().get();
    const images = imagesSnap.docs.length;
    try {
      await this.galleryRef().update({
        images,
      });
    } catch (err: unknown) {
      this.app.logger.info('gallery.update-image-count failed', err);
    }
  }

  pathForOriginal(name: string) {
    return `galleries/${this.name}/${name}`;
  }

  pathForThumbnail(original: string, id: string) {
    const { name } = path.parse(original);
    return `galleries/${this.name}/thumbnails/${name}-${id}.jpeg`;
  }

  async _resolveOriginal(original: File, buffer: Buffer) {
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

  async _createThumbnails(name: string, original: Buffer) {
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
        this.app.logger.info('gallery.create-thumbnail', file.name);
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
    }, {}) as GalleryImageDataThumbnails;
  }

  async _createImageDoc(name: string, original: GalleryImageDataImageInfo, thumbnails: GalleryImageDataThumbnails) {
    const ref = this.imageRef(name);
    this.app.logger.info('gallery.create-image-doc', ref.path);

    await ref.set({
      name,
      original,
      thumbnails,
      createdAt: FieldValue.serverTimestamp(),
    });
    return ref;
  }

  async onImageFinalized(name: string) {
    this.app.logger.info('gallery.on-image-finalized', this.name, name);

    const bucket = this.bucket;
    const path = this.pathForOriginal(name);
    const file = bucket.file(path);
    const [buffer] = await file.download();

    const [original, thumbnails] = await Promise.all([
      this._resolveOriginal(file, buffer),
      this._createThumbnails(name, buffer),
    ]);

    const [gallery, image] = await Promise.all([
      this._maybeCreateGallery(),
      this._createImageDoc(name, original, thumbnails),
    ]);

    return { gallery, image };
  }

  async _deleteFile(file: File) {
    this.app.logger.info('gallery.delete-file', file.name);
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

  async _deleteThumbnails(name: string) {
    const bucket = this.bucket;
    await Promise.all(
      thumbnails.map(async ({ id }) => {
        const file = bucket.file(this.pathForThumbnail(name, id));
        await this._deleteFile(file);
      }),
    );
  }

  async _deleteOriginal(name: string) {
    const file = this.bucket.file(this.pathForOriginal(name));
    await this._deleteFile(file);
  }

  async _deleteImageDoc(name: string) {
    const ref = this.imageRef(name);
    console.log('gallery.delete-image-doc', ref.path);
    await ref.delete();
  }

  async onImageDeleted(name: string) {
    this.app.logger.info('gallery.on-image-deleted', this.name, name);
    await Promise.all([this._deleteThumbnails(name), this._deleteOriginal(name), this.updateImageCount()]);
  }
}
