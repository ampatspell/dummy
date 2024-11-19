import * as fs from '@firebase/firestore';
import { firebase } from '../firebase/firebase.svelte';
import { Subscribable } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';
import { QueryAll } from '../firebase/fire/query.svelte';
import { getter } from '../utils/options';
import { MapModels } from '../firebase/fire/models.svelte';
import { FolderBaseModel } from './gallery.svelte';
import type { AssetsFolderData } from '$dummy-shared/documents';

export const assetsCollection = fs.collection(firebase.firestore, 'assets');

export type FoldersModelOptions = Record<string, never>;

export class FoldersModel extends Subscribable<FoldersModelOptions> {
  readonly _query = new QueryAll<AssetsFolderData>({
    ref: getter(() => assetsCollection),
  });

  readonly _models = new MapModels({
    source: getter(() => this._query.content),
    target: (doc) => new FolderBaseModel({ doc }),
    sort: { value: (model) => model.name },
  });

  readonly all = $derived(this._models.content);
  readonly isLoaded = $derived(this._query.isLoaded);

  readonly dependencies = [this._query, this._models];

  readonly serialized = $derived(serialized(this, []));

  static build() {
    return new FoldersModel({});
  }
}
