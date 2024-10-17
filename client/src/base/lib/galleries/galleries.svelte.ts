import * as fs from '@firebase/firestore';
import { firebase } from '../firebase/firebase.svelte';
import { Model } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';
import { QueryAll } from '../firebase/fire/query.svelte';
import { getter } from '../utils/options';
import { MapModels } from '../firebase/fire/models.svelte';
import { GalleryModel, type GalleryData } from './gallery.svelte';

export const galleriesCollection = fs.collection(firebase.firestore, 'galleries');

export type GalleriesModelOptions = Record<string, never>;

export class GalleriesModel extends Model<GalleriesModelOptions> {
  readonly _query = new QueryAll<GalleryData>({
    ref: getter(() => fs.query(galleriesCollection, fs.orderBy('name', 'asc'))),
  });

  readonly _models = new MapModels({
    source: getter(() => this._query.content),
    target: (doc) => new GalleryModel({ doc }),
  });

  readonly all = $derived(this._models.content);
  readonly isLoaded = $derived(this._query.isLoaded);

  readonly dependencies = [this._query];

  readonly serialized = $derived(serialized(this, []));
}
