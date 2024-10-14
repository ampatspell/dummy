import { Model } from '$lib/firebase/fire/model.svelte';
import * as fs from '@firebase/firestore';
import { QueryAll } from '$lib/firebase/fire/query.svelte';
import { getter } from '$lib/utils/options';
import { serialized } from '$lib/utils/object';
import { MapModels } from '$lib/firebase/fire/models.svelte';
import { BlockModel, type BlockData } from '../block/models/block.svelte';
import { existing } from '$lib/utils/existing';
import { BlocksDefinitionModel } from './definition.svelte';

export type BlocksModelOptions = {
  isEditing: boolean;
  definition: BlocksDefinitionModel;
  collection: fs.CollectionReference | undefined;
};

export class BlocksModel extends Model<BlocksModelOptions> {
  collection = $derived(this.options.collection);
  definition = $derived(this.options.definition);
  isEditing = $derived(this.options.isEditing);

  path = $derived(this.options.collection?.path);

  _query = new QueryAll<BlockData>({
    ref: getter(() => this.collection),
  });

  isLoaded = $derived(this._query.isLoaded);

  _all = new MapModels({
    source: getter(() => this._query.content),
    target: (doc) => this.definition.createBlock(this, doc),
  });

  all = $derived(this._all.content);

  _selected = $state<BlockModel>();
  selected = $derived(existing(this._selected));

  select(block?: BlockModel) {
    this._selected = block;
  }

  byId(id: string) {
    return this.all.find((block) => block.id === id);
  }

  async add<D extends BlockData>(data: D) {
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
