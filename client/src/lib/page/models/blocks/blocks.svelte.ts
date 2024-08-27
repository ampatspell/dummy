import { Model } from '$lib/firebase/fire/model.svelte';
import { QueryAll } from '$lib/firebase/fire/query.svelte';
import { getter } from '$lib/utils/options';
import { type CollectionReference } from '@firebase/firestore';
import { MapModels } from '$lib/firebase/fire/models.svelte';
import { BlockModel, createDocumentBlockModel, DocumentBlockModel } from './block/block.svelte';
import { reset } from './reset.svelte';
import type { BlockData } from '$lib/utils/types';
import type { Document } from '$lib/firebase/fire/document.svelte';
import { MutableExistingBlock } from './block/existing.svelte';

export type BlocksModelOptions = {
  collectionRef: CollectionReference | undefined;
  isEditable: boolean;
};

export class BlocksModel extends Model<BlocksModelOptions> {
  collectionRef = $derived(this.options.collectionRef);

  _query = new QueryAll<BlockData>({
    ref: getter(() => this.collectionRef),
  });

  _all: MapModels<Document<BlockData>, DocumentBlockModel> = new MapModels({
    source: getter(() => this._query.content),
    target: (doc) => {
      return createDocumentBlockModel(doc, { blocks: this });
    },
  });

  all = $derived(this._all.content);

  byId(id: string) {
    return this.all.find((block) => block.id === id);
  }

  _editing = new MutableExistingBlock();
  editing = $derived(this._editing.content);

  _selected = new MutableExistingBlock();
  selected = $derived(this._selected.content);

  edit(block?: BlockModel) {
    this._editing.value = block;
  }

  select(block?: BlockModel) {
    this._selected.value = block;
    this.edit(undefined);
  }

  async reset() {
    return await reset(this);
  }

  isEditable = $derived(this.options.isEditable);
  isLoaded = $derived(this._query.isLoaded);

  dependencies = [this._query];
}
