import { Model } from '$lib/firebase/fire/model.svelte';
import * as fs from '@firebase/firestore';
import type { BlocksDefinitionModel } from './definition.svelte';
import { QueryAll } from '$lib/firebase/fire/query.svelte';
import { getter } from '$lib/utils/options';
import { serialized } from '$lib/utils/object';
import { MapModels } from '$lib/firebase/fire/models.svelte';
import { type BlockData, BlockModel } from './block.svelte';

export type BlocksModelOptions = {
  definition: BlocksDefinitionModel;
  collection: fs.CollectionReference | undefined;
};

export class BlocksModel extends Model<BlocksModelOptions> {
  collection = $derived(this.options.collection);
  definition = $derived(this.options.definition);

  path = $derived(this.options.collection?.path);

  _query = new QueryAll<BlockData>({
    ref: getter(() => this.collection),
  });

  isLoaded = $derived(this._query.isLoaded);

  _all = new MapModels({
    source: getter(() => this._query.content),
    target: (doc) => new BlockModel({ blocks: this, doc }),
  });

  all = $derived(this._all.content);

  byId(id: string) {
    return this.all.find((block) => block.id === id);
  }

  async add(data: BlockData) {
    const collection = this.collection;
    if (collection) {
      const ref = fs.doc(collection);
      await fs.setDoc(ref, data);
      return this.all.find((block) => block.id === ref.id);
    }
  }

  dependencies = [this._query];
  serialized = $derived(serialized(this, ['path', 'isLoaded']));
}
