import { Model } from '../firebase/fire/model.svelte';
import type { OptionsInput } from '../utils/options';
import { firebase } from '../firebase/firebase.svelte';
import { serialized } from '../utils/object';
import {
  browserPopupRedirectResolver,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type IdTokenResult,
  type User,
} from '@firebase/auth';
import { goto } from '$app/navigation';
import { httpsCallable } from '@firebase/functions';
import type { FunctionsSetRoleEventRequest, FunctionsSetRoleEventResponse } from '$dummy-shared/functions';

export type SessionUserModelOptions = {
  user: User;
  token: IdTokenResult;
};

export class SessionUser extends Model<SessionUserModelOptions> {
  private readonly user = $derived(this.options.user);
  private readonly claims = $derived(this.options.token.claims);
  private readonly role = $derived(this.claims['role'] as string | undefined);

  readonly uid = $derived(this.user.uid);
  readonly email = $derived(this.user.email);
  readonly isAdmin = $derived(this.role === 'admin');

  readonly serialized = $derived(serialized(this, ['uid', 'email', 'isAdmin']));
}

export type SessionModelOptions = Record<string, never>;

export class SessionModel extends Model<SessionModelOptions> {
  isLoading = $state(true);
  isLoaded = $state(false);
  user = $state<SessionUser>();

  constructor(opts: OptionsInput<SessionModelOptions>) {
    super(opts);
    firebase.auth.beforeAuthStateChanged((user) => this.onBeforeAuthStateChanged(user));
    firebase.auth.onIdTokenChanged((user) => this.onIdTokenChanged(user));
    this.ready();
  }

  private onBeforeAuthStateChanged(user: User | null) {
    if (!user) {
      goto('/');
    }
  }

  private async onIdTokenChanged(user: User | null) {
    if (user) {
      const token = await user.getIdTokenResult();
      this.user = new SessionUser({ user, token });
    } else {
      this.user = undefined;
    }
  }

  __ready?: Promise<SessionModel>;

  private async _ready() {
    await firebase.auth.authStateReady();
    this.isLoaded = true;
    this.isLoading = false;
    return this;
  }

  async ready() {
    if (!this.__ready) {
      this.__ready = this._ready();
    }
    return this.__ready!;
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(firebase.auth, provider, browserPopupRedirectResolver);
  }

  async signOut() {
    await signOut(firebase.auth);
  }

  async setRole(uid: string, role: string) {
    const callable = httpsCallable<FunctionsSetRoleEventRequest, FunctionsSetRoleEventResponse>(
      firebase.functions,
      'setRole',
    );
    const { data } = await callable({
      uid,
      role,
    });
    return data;
  }

  readonly serialized = $derived(serialized(this, ['isLoaded', 'user']));
}

let _session: SessionModel | undefined;

export const getSession = () => {
  if (!_session) {
    _session = new SessionModel({});
  }
  return _session;
};
