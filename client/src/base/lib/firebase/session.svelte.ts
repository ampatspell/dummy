import { signInWithEmailAndPassword, signOut, type User } from '@firebase/auth';
import type { Firebase } from './firebase.svelte';

export class SessionUser {
  private user = $state<User>()!;

  constructor(user: User) {
    this.user = user;
  }

  get uid() {
    return this.user.uid;
  }

  get email() {
    return this.user.email;
  }

  get isAnonymous() {
    return this.user.isAnonymous;
  }

  serialized = $derived.by(() => {
    const { uid, email, isAnonymous } = this;
    return { uid, email, isAnonymous };
  });
}

export class Session {
  firebase: Firebase;
  user = $state<SessionUser>();

  isLoading = $state(true);
  isLoaded = $state(false);

  constructor(firebase: Firebase) {
    this.firebase = firebase;
    this._mount();
  }

  async _ready() {
    await this.firebase.auth.authStateReady();
    this.isLoaded = true;
    this.isLoading = false;
  }

  _mount() {
    this._ready();
    this.firebase.auth.onIdTokenChanged((user) => {
      this.user = user ? new SessionUser(user) : undefined;
    });
  }

  async signInDefault() {
    await signInWithEmailAndPassword(this.firebase.auth, 'ampatspell@gmail.com', 'heythere');
  }

  async signOut() {
    await signOut(this.firebase.auth);
  }

  serialized = $derived.by(() => {
    const { isLoaded, user } = this;
    return {
      isLoaded,
      user: user?.serialized,
    };
  });
}
