import { Model } from '../firebase/fire/model.svelte';
import type { OptionsInput } from '../utils/options';
import { firebase } from '../firebase/firebase.svelte';
import { serialized } from '../utils/object';
import {
  GoogleAuthProvider,
  type IdTokenResult,
  type User,
  browserPopupRedirectResolver,
  signInWithPopup,
  signOut,
} from '@firebase/auth';
import { goto } from '$app/navigation';
import { httpsCallable } from '@firebase/functions';
import type { FunctionsSetRoleEventRequest, FunctionsSetRoleEventResponse } from '$dummy-shared/functions';
import { setGlobal } from '../utils/set-global';
import { dev } from '$app/environment';

export type SessionUserModelOptions = {
  user: User;
};

export class SessionUser extends Model<SessionUserModelOptions> {
  private _load?: Promise<void>;

  load() {
    if (!this._load) {
      const load = async () => {
        this.token = await this.user.getIdTokenResult();
      };
      this._load = load();
    }
    return this._load;
  }

  private readonly user = $derived(this.options.user);

  private token = $state<IdTokenResult>();
  private readonly claims = $derived(this.token?.claims);
  readonly role = $derived(this.claims?.['role'] as string | undefined);

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
      this.user = new SessionUser({ user });
      await this.user.load();
    } else {
      this.user = undefined;
    }
  }

  __ready?: Promise<SessionModel>;

  private async _ready() {
    await firebase.auth.authStateReady();
    await this.user?.load();
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
    if(dev) {
      setGlobal({ session: _session });
    }
  }
  return _session;
};
