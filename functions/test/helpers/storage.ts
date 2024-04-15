import path, { extname } from "path";
import Application from "../../src/app";
import { getTestApp } from "./setup";
import { readFile } from 'node:fs/promises';
import { getDownloadURL } from "firebase-admin/storage";

const mimeTypes = {
  '.png': 'image/png',
};

export class StorageHelper {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async loadBuffer(name: string) {
    return await readFile(path.join(__dirname, 'files', name));
  }

  contentTypeFor(name: string) {
    const ext = extname(name);
    return mimeTypes[ext] ?? 'application/octet-stream';
  }

  async uploadFile(source: string, target: string) {
    const buffer = await this.loadBuffer(source);
    const file = this.app.bucket.file(target);
    const contentType = this.contentTypeFor(source);
    await file.save(buffer, {
      resumable: false,
      contentType
    });
    let url = await getDownloadURL(file);
    return { url };
  }
}

export const storage = (suite: Mocha.Suite) => {
  suite.beforeEach(() => {
    let app = getTestApp(suite);
    (suite as any).storage = new StorageHelper(app);
  });
}

export const getStorageHelper = (suite: Mocha.Suite) => {
  return (suite as any).storage as StorageHelper;
}
