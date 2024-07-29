import { Model } from '$lib/firebase/fire/model.svelte';
import { QueryAll } from '$lib/firebase/fire/query.svelte';
import { getter } from '$lib/utils/options';
import { type CollectionReference } from '@firebase/firestore';
import { type BlockData } from '../data';
import { MapModels } from '$lib/firebase/fire/models.svelte';
import { createBlockModel } from './block/block.svelte';
import { reset } from './reset.svelte';

export type BlocksModelOptions = {
  collectionRef: CollectionReference | undefined;
};

export class BlocksModel extends Model<BlocksModelOptions> {
  collectionRef = $derived(this.options.collectionRef);

  _query = new QueryAll<BlockData>({
    ref: getter(() => this.collectionRef),
  });

  _all = new MapModels({
    source: getter(() => this._query.content),
    target: (doc) => createBlockModel({ doc, blocks: this }),
  });

  all = $derived(this._all.content);

  byId(id: string) {
    this.all.find((block) => block.id === id);
  }

  async reset() {
    return await reset(this);
  }

  dependencies = [this._query];
}
