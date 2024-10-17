import admin from 'firebase-admin';
import { getApps, initializeApp, type App, type AppOptions } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

export const getFirebase = async () => {
  let [app] = getApps();
  if (!app) {
    let options: AppOptions;
    if (process.env.FIREBASE_CONFIG) {
      options = {};
    } else {
      options = {
        credential: admin.credential.cert('/Users/ampatspell/src/service-account-keys/quatsch-38adf.json'),
        storageBucket: 'quatsch-38adf.appspot.com',
        projectId: 'quatsch-38adf',
      };
    }
    app = initializeApp(options);
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

  get storage() {
    return getStorage(this._app);
  }
}
