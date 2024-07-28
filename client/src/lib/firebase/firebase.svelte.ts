import { PUBLIC_FIREBASE } from '$env/static/public';
import { type FirebaseOptions, getApps, initializeApp } from 'firebase/app';
import { type Auth, browserLocalPersistence, initializeAuth } from 'firebase/auth';
import {
  type DocumentReference,
  type Firestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';

import { Session } from './session.svelte';
import { setGlobal } from '$lib/utils/set-global';

const options = JSON.parse(PUBLIC_FIREBASE) as FirebaseOptions;

export class Firebase {
  options: FirebaseOptions;
  private _firestore?: Firestore;
  private _auth?: Auth;

  session: Session;

  constructor(options: FirebaseOptions) {
    this.options = options;
    this.session = new Session(this);
  }

  get app() {
    let [app] = getApps();
    if (!app) {
      app = initializeApp(this.options);
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

  get dashboardUrl() {
    return `https://console.firebase.google.com/u/0/project/${this.options.projectId}`;
  }

  openDashboard() {
    window.open(this.dashboardUrl);
  }

  openDocumentReference(ref: DocumentReference) {
    const path = encodeURIComponent(ref.path);
    window.open(`${this.dashboardUrl}/firestore/data/${path}`);
  }

  serialized = $derived.by(() => {
    const {
      options: { projectId },
      session,
    } = this;
    return {
      projectId,
      session: session.serialized,
    };
  });
}

export const firebase = new Firebase(options);

setGlobal({ firebase });
