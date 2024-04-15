import sharp, { FitEnum } from "sharp";
import Application from "./app";
import { getDownloadURL } from "firebase-admin/storage";
import path from "path";
import { File } from "@google-cloud/storage";
import { FieldValue } from "firebase-admin/firestore";

export class GalleriesService {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  gallery(name: string) {
    return new GalleryService(this, name);
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

  get bucket() {
    return this.galleries.app.bucket;
  }

  get firestore() {
    return this.galleries.app.firestore;
  }

  async _maybeCreateGallery() {
    const name = this.name;
    const ref = this.firestore.doc(`galleries/${name}`);
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

  async onImageFinalized(name: string) {
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

    const image = this.firestore.doc(`galleries/${this.name}/images/${name}`);

    const data: GalleryImageDataCreate = {
      name,
      sizes,
      createdAt: FieldValue.serverTimestamp(),
    };

    let [ gallery ] =  await Promise.all([
      this._maybeCreateGallery(),
      image.set(data),
    ]);

    return { gallery, image };
  }

}
