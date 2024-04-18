import sharp, { FitEnum } from "sharp";
import Application from "./app";
import { getDownloadURL } from "firebase-admin/storage";
import path from "path";
import { File } from "@google-cloud/storage";
import { FieldValue } from "firebase-admin/firestore";
import { murl } from "./utils/murl";

type OriginalPattern = {
  gallery: string,
  file: string
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
    if(!hash) {
      return undefined;
    }
    return hash;
  }

  async onObjectFinalized(path: string, contentType: string | undefined): Promise<boolean> {
    if(!contentType?.startsWith('image/')) {
      return false;
    }
    const resolved = this.resolvePathForOriginal(path);
    if(!resolved) {
      return false;
    }
    const gallery = this.gallery(resolved.gallery);
    await gallery.onImageFinalized(resolved.file);
    return true;
  }

  async onObjectDeleted(path: string): Promise<boolean> {
    const resolved = this.resolvePathForOriginal(path);
    if(!resolved) {
      return false;
    }
    const gallery = this.gallery(resolved.gallery);
    await gallery.onImageDeleted(resolved.file);
    return true;
  }

}

type GalleryImageData = {
  name: string;
  createdAt: Date;
  sizes: {
    [key: string]: {
      url: string,
      size: { width: number, height: number }
    };
  };
};

type GalleryImageDataCreate = Omit<GalleryImageData, 'createdAt'> & { createdAt: FieldValue};

type ThumbnailDefinition = { id: string, width: number, height: number, fit: keyof FitEnum };

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
    return this.firestore.doc(`galleries/${this.name}`);
  }

  imageRef(name: string) {
    return this.firestore.doc(`galleries/${this.name}/images/${name}`);
  }

  async _maybeCreateGallery() {
    const name = this.name;
    const ref = this.galleryRef();
    try {
      await ref.create({
        name
      });
    } catch(err: any) {
      if(err.code !== 6) {
        throw err;
      }
    }
    return ref;
  }

  pathForOriginal(name: string) {
    return `galleries/${this.name}/${name}`;
  }

  pathForThumbnail(original: string, id: string) {
    const { name } = path.parse(original);
    return `galleries/${this.name}/thumbnails/${name}-${id}.jpeg`;
  }

  async _resolveOriginal(original: File, buffer: Buffer) {
    const [ url, metadata ] = await Promise.all([
      getDownloadURL(original),
      sharp(buffer).metadata(),
    ]);

    const size = {
      width: metadata.width!,
      height: metadata.height!,
    };

    return {
      url,
      size
    };
  }

  async _createThumbnails(name: string, original: Buffer) {
    const bucket = this.bucket;
    return await Promise.all(thumbnails.map(async ({ width, height, fit, id }) => {
      const { data, info } = await sharp(original).resize({
        width,
        height,
        fit,
        withoutEnlargement: true
      }).jpeg({ quality: 80 }).toBuffer({ resolveWithObject: true });
      const size = { width: info.width, height: info.height };
      const file = bucket.file(this.pathForThumbnail(name, id));
      this.app.logger.info('gallery.create-thumbnail', file.name);
      await file.save(data, {
        resumable: false,
        contentType: 'image/jpeg'
      });
      const url = await getDownloadURL(file);
      return {
        id,
        size,
        url
      };
    }));
  }

  async _createImageDoc(name: string, sizes: GalleryImageDataCreate['sizes']) {
    const ref = this.imageRef(name);
    this.app.logger.info('gallery.create-image-doc', ref.path);

    await ref.set({
      name,
      sizes,
      createdAt: FieldValue.serverTimestamp(),
    } satisfies GalleryImageDataCreate);
    return ref;
  }

  async onImageFinalized(name: string) {
    this.app.logger.info('gallery.on-image-finalized', this.name, name);

    const bucket = this.bucket;
    const path = this.pathForOriginal(name);
    const file = bucket.file(path);
    let [ buffer ] = await file.download();

    let [ original, thumbnails ] = await Promise.all([
      this._resolveOriginal(file, buffer),
      this._createThumbnails(name, buffer),
    ]);

    const sizes: GalleryImageData['sizes'] = {
      original,
      ...thumbnails.reduce((hash, { id, size, url }) => {
        hash[id] = { size, url };
        return hash;
      }, {}),
    };

    let [ gallery, image ] =  await Promise.all([
      this._maybeCreateGallery(),
      this._createImageDoc(name, sizes),
    ]);

    return { gallery, image };
  }

  async _deleteThumbnails(name: string) {
    const bucket = this.bucket;
    await Promise.all(thumbnails.map(async ({ id }) => {
      const file = bucket.file(this.pathForThumbnail(name, id));
      this.app.logger.info('gallery.delete-thumbnail', file.name);
      try {
        await file.delete();
      } catch(err: any) {
        if(err.code === 404) {
          return;
        }
        throw err;
      }
    }));
  }

  async _deleteImageDoc(name: string) {
    const ref = this.imageRef(name);
    console.log('gallery.delete-image-doc', ref.path);
    await ref.delete();
  }

  async onImageDeleted(name: string) {
    this.app.logger.info('gallery.on-image-deleted', this.name, name);
    await Promise.all([
      this._deleteThumbnails(name),
      this._deleteImageDoc(name)
    ]);
  }

}
