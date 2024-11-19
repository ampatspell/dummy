import * as fs from '@firebase/firestore';
import { Subscribable } from '../firebase/fire/model.svelte';
import { firebase } from '../firebase/firebase.svelte';
import type { LayoutData } from '$dummy-shared/documents';
import { type OptionsInput, getter } from '../utils/options';
import { QueryAll } from '../firebase/fire/query.svelte';
import { MapModels } from '../firebase/fire/models.svelte';
import { LayoutModel } from './layout.svelte';
import { serialized } from '../utils/object';
import type { SiteModel } from '../site/site.svelte';

export const layoutsCollection = fs.collection(firebase.firestore, 'layouts');

export type LayoutModelOptions = {
  site: SiteModel;
};

export class LayoutsModel extends Subscribable<LayoutModelOptions> {
  readonly site = $derived(this.options.site);

  readonly _query = new QueryAll<LayoutData>({
    ref: getter(() => layoutsCollection),
  });

  readonly _models = new MapModels({
    source: getter(() => this._query.content),
    target: (doc) => new LayoutModel({ doc }),
    sort: { value: (model) => model.name },
  });

  readonly all = $derived(this._models.content);

  readonly selected = $derived.by(() => {
    const id = this.site.layout?.id;
    if (id) {
      return this.all.find((model) => model.id === id);
    }
  });

  readonly isLoaded = $derived(this._query.isLoaded);
  readonly dependencies = [this._query, this._models];
  readonly serialized = $derived(serialized(this, []));
}

export const buildLayoutsModel = (opts: OptionsInput<LayoutModelOptions>) => new LayoutsModel(opts);
