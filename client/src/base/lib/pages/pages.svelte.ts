import * as fs from '@firebase/firestore';
import { firebase } from '../firebase/firebase.svelte';
import { Subscribable } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';
import { QueryAll } from '../firebase/fire/query.svelte';
import { getter } from '../utils/options';
import { MapModels } from '../firebase/fire/models.svelte';
import { PageModel } from './page.svelte';
import type { PageData } from '$shared/documents';

export const pagesCollection = fs.collection(firebase.firestore, 'pages');

export type PagesModelOptions = Record<string, never>;

export class PagesModel extends Subscribable<PagesModelOptions> {
  readonly _query = new QueryAll<PageData>({
    ref: getter(() => fs.query(pagesCollection, fs.orderBy('name', 'asc'))),
  });

  readonly _models = new MapModels({
    source: getter(() => this._query.content),
    target: (doc) => new PageModel({ doc }),
  });

  readonly all = $derived(this._models.content);
  readonly isLoaded = $derived(this._query.isLoaded);

  readonly dependencies = [this._query, this._models];

  readonly serialized = $derived(serialized(this, []));
}
