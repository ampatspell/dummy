import { PUBLIC_FIREBASE } from '$env/static/public';
import { type FirebaseOptions, getApps, initializeApp } from 'firebase/app';
import { type Auth, browserLocalPersistence, initializeAuth } from 'firebase/auth';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getFunctions, type Functions } from 'firebase/functions';
import {
  type DocumentReference,
  type Firestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import { Model } from './fire/model.svelte';
import { serialized } from '../utils/object';

const options = JSON.parse(PUBLIC_FIREBASE) as FirebaseOptions;

export class Firebase extends Model<{ firebase: FirebaseOptions }> {
  readonly projectId = $derived.by(() => this.options.firebase.projectId);

  private _firestore?: Firestore;
  private _auth?: Auth;
  private _storage?: FirebaseStorage;
  private _functions?: Functions;

  get app() {
    let [app] = getApps();
    if (!app) {
      app = initializeApp(this.options.firebase);
    }
    return app;
  }

  get firestore() {
    if (!this._firestore) {
      this._firestore = initializeFirestore(this.app, {
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
      });
    }
    return this._firestore;
  }

  get auth() {
    if (!this._auth) {
      this._auth = initializeAuth(this.app, { persistence: browserLocalPersistence });
    }
    return this._auth;
  }

  get storage() {
    if (!this._storage) {
      this._storage = getStorage(this.app);
    }
    return this._storage;
  }

  get functions() {
    if (!this._functions) {
      this._functions = getFunctions(this.app);
    }
    return this._functions;
  }

  get dashboardUrl() {
    return `https://console.firebase.google.com/u/0/project/${this.projectId}`;
  }

  openDashboard() {
    window.open(this.dashboardUrl);
  }

  openDocumentReference(ref: DocumentReference) {
    const path = encodeURIComponent(ref.path);
    window.open(`${this.dashboardUrl}/firestore/data/${path}`);
  }

  serialized = $derived(serialized(this, ['projectId']));
}

export const firebase = new Firebase({ firebase: options });
