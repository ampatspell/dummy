import { App } from "firebase-admin/app";
import { Firestore, initializeFirestore } from "firebase-admin/firestore";

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

  constructor(options: ApplicationOptions) {
    this._options = options;
    this.firestore = initializeFirestore(this._options.instance);
  }

  get logger() {
    return this._options.logger;
  }

}
