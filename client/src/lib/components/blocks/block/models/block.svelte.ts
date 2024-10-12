import { Model } from '$lib/firebase/fire/model.svelte';
import type { BlocksModel } from '../../models/blocks.svelte';
import { update, type Document, type UpdateCallback } from '$lib/firebase/fire/document.svelte';
import { serialized } from '$lib/utils/object';

export type BlockProps = {
  [key: string]: BlockProp;
};

export type BlockProp = {
  type: 'block';
  id: string;
};

export type BlockData = {
  definition: string;
  props: BlockProps;
};

export type BlockModelOptions = {
  blocks: BlocksModel;
  doc: Document<BlockData>;
};

export class BlockModel extends Model<BlockModelOptions> {
  _doc = $derived(this.options.doc);
  _data = $derived(this._doc.data);

  id = $derived(this._doc.id);
  exists = $derived(this._doc.exists);

  definition = $derived.by(() => {
    const id = this._data?.definition;
    if (id) {
      return this.options.blocks.definition.byId(id);
    }
  });

  update = (cb: UpdateCallback<BlockData>) => update(this._doc, cb);

  serialized = $derived(serialized(this, ['id', 'definition']));
}
