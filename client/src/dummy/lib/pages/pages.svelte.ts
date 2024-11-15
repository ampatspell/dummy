import * as fs from '@firebase/firestore';
import { firebase } from '../firebase/firebase.svelte';
import { Subscribable } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';
import { QueryAll } from '../firebase/fire/query.svelte';
import { getter } from '../utils/options';
import { MapModels } from '../firebase/fire/models.svelte';
import { PageBaseModel } from './page.svelte';
import type { PageData } from '$dummy-shared/documents';
import { isTruthy } from '../utils/array';
import { existing } from '../utils/existing';
import { isLoaded } from '../firebase/fire/utils.svelte';

export const pagesCollection = fs.collection(firebase.firestore, 'pages');

export type PagesModelOptions = Record<string, never>;

export class PagesModel extends Subscribable<PagesModelOptions> {
  readonly _query = new QueryAll<PageData>({
    ref: getter(() => fs.query(pagesCollection, fs.orderBy('name', 'asc'))),
  });

  readonly _models = new MapModels({
    source: getter(() => this._query.content),
    target: (doc) => new PageBaseModel({ doc }),
  });

  readonly all = $derived(this._models.content);

  byId(id: string) {
    return this.all.find((page) => page.id === id);
  }

  readonly isLoaded = $derived(this._query.isLoaded);
  readonly dependencies = [this._query, this._models];
  readonly serialized = $derived(serialized(this, []));

  static build() {
    return new PagesModel({});
  }
}

export type BasePagesByIdsModelOptions = {
  ids: (string | undefined)[] | undefined;
};

export class BasePagesByIdsModel extends Subscribable<BasePagesByIdsModelOptions> {
  readonly ids = $derived((this.options.ids ?? []).filter(isTruthy));

  readonly _pages = new MapModels({
    source: getter(() => this.ids),
    target: (id) => PageBaseModel.buildById({ id }),
  });

  readonly all = $derived(this._pages.content);
  readonly existing = $derived(this.all.map((page) => existing(page)).filter(isTruthy));

  readonly dependencies = [this._pages];
  readonly isLoaded = $derived(isLoaded([...this.all]));
}
