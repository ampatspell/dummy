import {
  type DocumentData,
  type Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  getDocs,
  getDocsFromCache,
  getDocsFromServer,
  limit,
  onSnapshot,
  query,
} from '@firebase/firestore';
import { untrack } from 'svelte';

import { Document, type DocumentLoadSource } from './document.svelte';
import { FirebaseModel, type FirebaseModelOptions } from './firebase.svelte';
import { stats } from './stats.svelte';
import type { VoidCallback } from '$base/lib/utils/types';
import { insertObjectAt, removeObjectAt } from '$base/lib/utils/array';
import { serialized } from '$base/lib/utils/object';

export type DocumentsLoadOptions = {
  source?: DocumentLoadSource;
};

const getDocsBySource = (ref: Query, source: DocumentLoadSource) => {
  if (source === 'cached') {
    return getDocsFromCache(ref);
  } else if (source === 'remote') {
    return getDocsFromServer(ref);
  } else if (source === undefined) {
    return getDocs(ref);
  }
  throw new Error(`unsupported source ${source}`);
};

export type QueryBaseOptions = {
  ref: Query | undefined;
} & FirebaseModelOptions;

export class QueryBase<
  T extends DocumentData = DocumentData,
  O extends QueryBaseOptions = QueryBaseOptions,
> extends FirebaseModel<O> {
  ref = $derived(this.options.ref);

  path = $derived.by(() => {
    const { ref } = this;
    if (ref) {
      const path = (ref as unknown as { path: string | undefined }).path;
      return path;
    }
  });

  private needsContentReset = false;
  _content = $state<Document<T>[]>([]);

  _onWillLoad(subscribe: boolean) {
    super._onWillLoad(subscribe);
    if (subscribe) {
      this.needsContentReset = true;
    } else {
      this._content = [];
    }
  }

  _maybeResetContent() {
    const content = this._content;
    if (this.needsContentReset) {
      this._content = [];
      this.needsContentReset = false;
    }
    return content;
  }

  _subscribeActive() {
    return $effect.root(() => {
      $effect.pre(() => {
        const ref = this.ref;

        untrack(() => this._onWillLoad(!!ref));

        let cancel: VoidCallback;
        if (ref) {
          const normalized = this._normalizeRef(ref);
          const snapshot = onSnapshot(
            normalized,
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
          cancel?.();
        };
      });
    });
  }

  _normalizeRef(ref: Query) {
    return ref;
  }

  _onSnapshot(querySnapshot: QuerySnapshot) {
    const previous = this._maybeResetContent();
    const findOrCreate = (snapshot: QueryDocumentSnapshot) => {
      let doc = previous.find((doc) => doc.path === snapshot.ref.path);
      if (!doc) {
        doc = new Document<T>({ ref: snapshot.ref, isNew: false, isPassive: true });
      }
      return doc;
    };

    const current = this._content;

    querySnapshot.docChanges().forEach(({ type, oldIndex, newIndex, doc: snapshot }) => {
      if (type === 'added') {
        const doc = findOrCreate(snapshot);
        doc._onSnapshot(snapshot);
        insertObjectAt(current, newIndex, doc);
      } else if (type === 'modified') {
        const doc = current[oldIndex];
        doc._onSnapshot(snapshot);
        if (oldIndex !== newIndex) {
          removeObjectAt(current, oldIndex);
          insertObjectAt(current, newIndex, doc);
        }
      } else if (type === 'removed') {
        const doc = current[oldIndex];
        doc._onSnapshot(snapshot);
        removeObjectAt(current, oldIndex);
      }
    });

    this._onDidLoad(querySnapshot.metadata);
  }

  async load(options: DocumentsLoadOptions) {
    // todo queue and parallel subscription + load
    this.isLoading = true;
    try {
      const ref = this.ref;
      if (!ref) {
        return;
      }
      const normalized = this._normalizeRef(ref);
      const snapshot = await getDocsBySource(normalized, options.source);
      this.needsContentReset = true;
      this._onSnapshot(snapshot);
    } catch (err) {
      this._onError(err);
    } finally {
      this.isLoading = false;
    }
  }
}

export type QueryAllOptions = QueryBaseOptions;

export class QueryAll<T extends DocumentData = DocumentData> extends QueryBase<T, QueryAllOptions> {
  content = $derived(this._content);
  size = $derived(this.content.length);

  serialized = $derived.by(() =>
    serialized(this, ['path', 'isLoading', 'isLoaded', 'isError', 'error', 'isSubscribed', 'size']),
  );
}

export type QueryFirstOptions = QueryBaseOptions;

export class QueryFirst<T extends DocumentData = DocumentData> extends QueryBase<T, QueryFirstOptions> {
  content = $derived<Document<T> | undefined>(this._content[0]);

  exists = $derived.by(() => {
    if (this.isLoaded) {
      return !!this.content;
    }
  });

  _normalizeRef(ref: Query) {
    return query(ref, limit(1));
  }

  serialized = $derived.by(() =>
    serialized(this, ['path', 'isLoading', 'isLoaded', 'isError', 'error', 'isSubscribed', 'exists']),
  );
}
