import { App } from "firebase-admin/app";
import { Firestore, initializeFirestore } from "firebase-admin/firestore";
import { getStorage, Storage } from "firebase-admin/storage";
import { GalleriesService } from "./galleries";
import { inspect } from "util";
import { PagesService } from "./pages";

export type Logger = {
  info(...args: any[]): void;
};

export type ApplicationOptions = {
  instance: App;
  logger: Logger;
};

export default class Application {
  _options: ApplicationOptions;

  firestore: Firestore;
  storage: Storage;

  constructor(options: ApplicationOptions) {
    this._options = options;
    this.firestore = initializeFirestore(this._options.instance);
    this.storage = getStorage(this._options.instance);
  }

  get bucket() {
    return this.storage.bucket();
  }

  get logger() {
    return this._options.logger;
  }

  get galleries() {
    return new GalleriesService(this);
  }

  get pages() {
    return new PagesService(this);
  }

  dir(object: any) {
    return inspect(object, { depth: 8 });
  }

}
