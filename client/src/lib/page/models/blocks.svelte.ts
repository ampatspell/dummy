import { Model } from '$lib/firebase/fire/model.svelte';
import { QueryAll } from '$lib/firebase/fire/query.svelte';
import { getter } from '$lib/utils/options';
import { type CollectionReference } from '@firebase/firestore';
import { reset } from './blocks/reset.svelte';
import { MapModels } from '$lib/firebase/fire/models.svelte';
import { BlockModel, createBlockModel } from './blocks/block/block.svelte';
import type { Document } from '$lib/firebase/fire/document.svelte';
import type { BlockData } from '$lib/utils/types';

export type BlocksModelOptions = {
  isEditing: boolean;
  collectionRef: CollectionReference | undefined;
};

export class BlocksModel extends Model<BlocksModelOptions> {
  collectionRef = $derived(this.options.collectionRef);

  _query = new QueryAll<BlockData>({
    ref: getter(() => this.collectionRef),
  });

  _all: MapModels<Document<BlockData>, BlockModel> = new MapModels({
    source: getter(() => this._query.content),
    target: (doc) => createBlockModel(doc, { isEditing: getter(() => this.isEditing), blocks: getter(() => this.all) }),
  });

  all = $derived(this._all.content);

  byId(id: string) {
    this.all.find((block) => block.id === id);
  }

  async reset() {
    return await reset(this);
  }

  isEditing = $derived(this.options.isEditing);
  isLoaded = $derived(this._query.isLoaded);

  dependencies = [this._query];
}
