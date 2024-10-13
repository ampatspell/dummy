import { Model } from '$lib/firebase/fire/model.svelte';
import type { BlocksModel } from '../../models/blocks.svelte';
import { update, type Document, type UpdateCallback } from '$lib/firebase/fire/document.svelte';
import { serialized } from '$lib/utils/object';
import type { Component } from 'svelte';

export type BlockReferenceData = {
  id: string;
};

export type BlockData = {
  type: string;
};

export type BlockModelOptions<D extends BlockData> = {
  blocks: BlocksModel;
  doc: Document<D>;
};

export abstract class BlockModel<D extends BlockData = BlockData> extends Model<BlockModelOptions<D>> {
  blocks = $derived(this.options.blocks);

  _doc = $derived(this.options.doc);
  _data = $derived(this._doc.data! as D);

  isEditing = $derived(this.options.blocks.isEditing);
  isDisabled = $derived(!this.isEditing);

  id = $derived(this._doc.id!);
  exists = $derived(this._doc.exists);
  type = $derived(this._data.type);

  update = (cb: UpdateCallback<D>) => update(this._doc, cb);

  abstract readonly component: Component<{ block: BlockModel }>;
  abstract readonly inspector: Component<{ block: BlockModel }>;

  serialized = $derived(serialized(this, ['id', 'type']));
}
