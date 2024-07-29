import { Model } from '$lib/firebase/fire/model.svelte';
import { QueryAll } from '$lib/firebase/fire/query.svelte';
import { getter } from '$lib/utils/options';
import { type CollectionReference } from '@firebase/firestore';
import { MapModels } from '$lib/firebase/fire/models.svelte';
import { BlockModel, createBlockModel } from './block/block.svelte';
import { reset } from './reset.svelte';
import type { BlockData } from '$lib/utils/types';
import type { Document } from '$lib/firebase/fire/document.svelte';
import { ExistingBlock } from './block/existing.svelte';

export type BlocksModelOptions = {
  collectionRef: CollectionReference | undefined;
  isEditable: boolean;
};

export class BlocksModel extends Model<BlocksModelOptions> {
  collectionRef = $derived(this.options.collectionRef);

  _query = new QueryAll<BlockData>({
    ref: getter(() => this.collectionRef),
  });

  _all: MapModels<Document<BlockData>, BlockModel> = new MapModels({
    source: getter(() => this._query.content),
    target: (doc) => {
      return createBlockModel(doc, {
        blocks: getter(() => this.all),
        isEditable: getter(() => this.isEditable),
        isEditing: (block) => this.editing.content === block,
        onEdit: (block) => this.edit(block),
      });
    },
  });

  all = $derived(this._all.content);

  byId(id: string) {
    this.all.find((block) => block.id === id);
  }

  _editing = $state<BlockModel>();

  editing = new ExistingBlock({
    block: getter(() => this._editing),
  });

  edit(block: BlockModel) {
    this._editing = block;
  }

  async reset() {
    return await reset(this);
  }

  isEditable = $derived(this.options.isEditable);
  isLoaded = $derived(this._query.isLoaded);

  dependencies = [this._query];
}
