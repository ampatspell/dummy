import { browser } from '$app/environment';
import {
  type DocumentData,
  type DocumentReference,
  type DocumentSnapshot,
  deleteDoc,
  getDoc,
  getDocFromCache,
  getDocFromServer,
  onSnapshot,
  setDoc,
} from '@firebase/firestore';
import { untrack } from 'svelte';
import { Debounce } from './debounce.svelte';
import { FirebaseModel, type FirebaseModelOptions } from './firebase.svelte';
import { stats } from './stats.svelte';
import type { OptionsInput } from '$dummy/lib/utils/options';
import type { VoidCallback } from '$dummy/lib/utils/types';
import { serialized } from '$dummy/lib/utils/object';

export type UpdateCallback<D extends DocumentData> = (data: D) => void;

export const update = <D extends DocumentData>(doc: Document<D> | undefined, cb: UpdateCallback<D>) => {
  if (doc) {
    const data = doc.data;
    if (data) {
      cb(data);
      doc.scheduleSave();
    }
  }
};

const createToken = () => {
  if (browser) {
    return window.crypto.randomUUID().replaceAll('-', '');
  }
  return null;
};

export const TOKEN = '_token';

export type DocumentLoadSource = 'cached' | 'remote' | undefined;

const getDocBySource = (ref: DocumentReference, source: DocumentLoadSource) => {
  if (source === 'cached') {
    return getDocFromCache(ref);
  } else if (source === 'remote') {
    return getDocFromServer(ref);
  } else if (source === undefined) {
    return getDoc(ref);
  }
  throw new Error(`unsupported source ${source}`);
};

export type DocumentLoadOptions = {
  force?: boolean;
  source?: DocumentLoadSource;
};

export type DocumentOptions<T> = {
  /**
   * Defaults to false
   */
  ref?: DocumentReference;
  /**
   * Optional initial data
   */
  data?: T;
  /**
   * Defaults to true
   */
  isNew?: boolean;
} & FirebaseModelOptions;

// TODO: save merges. needs FieldProperty unset instead of setting nullTarget to null
export const toData = (input: unknown, nullTarget: unknown): unknown => {
  if (Array.isArray(input)) {
    return input.map((entry) => toData(entry, nullTarget));
  } else if (input === null || input === undefined) {
    return nullTarget;
  } else if (typeof input === 'object') {
    const out: Record<string, unknown> = {};
    for (const key in input) {
      const value = (input as DocumentData)[key] as DocumentData;
      out[key] = toData(value, nullTarget);
    }
    return out;
  } else {
    return input;
  }
};

export class Document<T extends DocumentData = DocumentData> extends FirebaseModel<DocumentOptions<T>> {
  readonly token: string | null;

  private _debounce = new Debounce({
    delay: 300,
    commit: () => this.save(),
  });

  constructor(options: OptionsInput<DocumentOptions<T>>) {
    super(options);
    this.token = createToken();
    this.isNew = this.options.isNew ?? true;
    const data = this.options.data;
    if (data) {
      this.data = data;
    }
  }

  data = $state<T>();
  exists = $state<boolean>();
  isNew = $state<boolean>()!; // TODO: this is not updated on snapshot and on save
  isSaving = $state(false);
  isDeleting = $state(false);

  ref = $derived(this.options.ref);
  id = $derived(this.ref?.id);
  path = $derived(this.ref?.path);

  _subscribeActive() {
    return $effect.root(() => {
      $effect.pre(() => {
        const ref = this.ref;

        untrack(() => this._onWillLoad(!!ref));

        let cancel: VoidCallback;
        if (ref) {
          const snapshot = onSnapshot(
            ref,
            { includeMetadataChanges: true },
            (snapshot) => {
              this._onSnapshot(snapshot);
            },
            (error) => {
              this._onError(error);
            },
          );
          const listening = stats._registerListening(this);
          cancel = () => {
            snapshot();
            listening();
          };
        }

        return () => {
          // TODO: this.debounce.force() needs last ref
          this._debounce.cancel();
          cancel?.();
        };
      });
    });
  }

  _onSnapshot(snapshot: DocumentSnapshot) {
    const exists = snapshot.exists();
    const next = snapshot.data({ serverTimestamps: 'estimate' }) as T | undefined;
    if (next && next[TOKEN] !== this.token) {
      this.data = toData(next, undefined) as T;
    }
    this.exists = exists;
    this._onDidLoad(snapshot.metadata);
  }

  async load(options: DocumentLoadOptions = {}) {
    if (this.isLoaded && !options.force) {
      return;
    }
    const ref = this.ref;
    if (!ref) {
      return;
    }
    this.isLoading = true;
    try {
      const snapshot = await getDocBySource(ref, options.source);
      this._onSnapshot(snapshot);
    } catch (err) {
      this._onError(err);
    } finally {
      this.isLoading = false;
    }
  }

  async save(): Promise<void> {
    const ref = this.ref;
    if (ref) {
      const data = Object.assign({}, toData($state.snapshot(this.data), null), { [TOKEN]: this.token });
      // TODO: queue
      // TODO: proper merge
      this.isSaving = true;
      try {
        await setDoc(ref, data, { merge: true });
      } catch (err) {
        this._onError(err);
      } finally {
        this.isSaving = false;
      }
    }
  }

  async delete(): Promise<void> {
    const ref = this.ref;
    if (ref) {
      this._debounce.cancel();
      // TODO: queue
      try {
        this.isDeleting = true;
        await deleteDoc(ref);
        this.exists = false;
      } catch (err) {
        this._onError(err);
      } finally {
        this.isSaving = false;
        this.isDeleting = false;
      }
    }
  }

  scheduleSave() {
    // TODO: do a queue
    this._debounce.schedule();
  }

  serialized = $derived(serialized(this, ['path', 'isLoading', 'isLoaded', 'error', 'isSubscribed']));
}
