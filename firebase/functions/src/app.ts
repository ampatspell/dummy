import { App } from "firebase-admin/app";
import { Firestore, initializeFirestore } from "firebase-admin/firestore";
import { getStorage, Storage } from "firebase-admin/storage";
import { GalleriesService } from "./galleries";
import { inspect } from "util";
import { PagesService } from "./pages";
import { Config } from "./config";
import { Auth, getAuth } from "firebase-admin/auth";
import { RoleService as RolesService } from "./roles";

export type Logger = {
  info(...args: any[]): void;
};

export type ApplicationOptions = {
  instance: App;
  logger: Logger;
  config: Config;
};

export default class Application {
  _options: ApplicationOptions;

  firestore: Firestore;
  storage: Storage;
  auth: Auth;

  constructor(options: ApplicationOptions) {
    this._options = options;
    this.firestore = initializeFirestore(this._options.instance);
    this.storage = getStorage(this._options.instance);
    this.auth = getAuth(this._options.instance);
  }

  get config() {
    return this._options.config;
  }

  get bucket() {
    return this.storage.bucket();
  }

  get logger() {
    return this._options.logger;
  }

  get roles() {
    return new RolesService(this);
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
