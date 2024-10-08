import { Model } from '$lib/firebase/fire/model.svelte';
import { QueryAll } from '$lib/firebase/fire/query.svelte';
import { getter } from '$lib/utils/options';
import { type CollectionReference } from '@firebase/firestore';
import { MapModels } from '$lib/firebase/fire/models.svelte';
import { BlockModel, DocumentBlockModel } from './block/block.svelte';
import { reset } from './reset.svelte';
import type { BlockData, BlockType } from '$lib/utils/types';
import type { Document } from '$lib/firebase/fire/document.svelte';
import { MutableExistingBlock } from './block/existing.svelte';
import { BlockDefinitionsModel } from './block/definition.svelte';

export type BlocksModelOptions = {
  collectionRef: CollectionReference | undefined;
  isEditable: boolean;
};

export class BlocksModel extends Model<BlocksModelOptions> {
  collectionRef = $derived(this.options.collectionRef);

  definitions = new BlockDefinitionsModel({
    blocks: this,
  });

  _query = new QueryAll<BlockData>({
    ref: getter(() => this.collectionRef),
  });

  _all: MapModels<Document<BlockData>, DocumentBlockModel> = new MapModels({
    source: getter(() => this._query.content),
    target: (doc) => {
      const type = doc.data!.type;
      const definition = this.definitions.byType(type);
      return definition.modelForDocument(doc);
    },
  });

  all = $derived(this._all.content);

  byId(id: string) {
    return this.all.find((block) => block.id === id);
  }

  _editing = new MutableExistingBlock({
    blocks: getter(() => this.all),
  });

  editing = $derived(this._editing.content);

  _selected = new MutableExistingBlock({
    blocks: getter(() => this.all),
  });

  selected = $derived(this._selected.content);

  edit(block?: BlockModel) {
    this._editing.value = block;
  }

  select(block?: BlockModel) {
    this._selected.value = block;
    this.edit(undefined);
  }

  async createNew(type: BlockType) {
    return await this.definitions.byType(type).createNew();
  }

  async reset() {
    return await reset(this);
  }

  isEditable = $derived(this.options.isEditable);
  isLoaded = $derived(this._query.isLoaded);

  dependencies = [this._query];
}
