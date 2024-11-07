import * as fs from '@firebase/firestore';
import { Subscribable } from '../firebase/fire/model.svelte';
import { firebase } from '../firebase/firebase.svelte';
import type { LayoutData } from '$dummy-shared/documents';
import { getter } from '../utils/options';
import { QueryAll } from '../firebase/fire/query.svelte';
import { MapModels } from '../firebase/fire/models.svelte';
import { LayoutModel } from './layout.svelte';
import { serialized } from '../utils/object';

export const layoutsCollection = fs.collection(firebase.firestore, 'layouts');

export type LayoutModelOptions = Record<string, never>;

export class LayoutsModel extends Subscribable<LayoutModelOptions> {
  readonly _query = new QueryAll<LayoutData>({
    ref: getter(() => fs.query(layoutsCollection, fs.orderBy('definition', 'asc'))),
  });

  readonly _models = new MapModels({
    source: getter(() => this._query.content),
    target: (doc) => new LayoutModel({ doc }),
  });

  readonly all = $derived(this._models.content);
  readonly isLoaded = $derived(this._query.isLoaded);

  readonly dependencies = [this._query, this._models];

  readonly serialized = $derived(serialized(this, []));
}

export const buildLayoutsModel = () => new LayoutsModel({});
