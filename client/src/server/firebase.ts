import admin from "firebase-admin";
import { getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const getFirebase = async () => {
  let [ app ] = getApps();
  if(!app) {
    app = initializeApp({
      credential: admin.credential.cert('/Users/ampatspell/src/service-account-keys/quatsch-38adf.json'),
      storageBucket: 'quatsch-38adf.appspot.com',
      projectId: 'quatsch-38adf'
    });
  }
  return new Firebase(app);
};

class Firebase {

  _app: App;

  constructor(app: App) {
    this._app = app;
  }

  get firestore() {
    return getFirestore(this._app);
  }

}
