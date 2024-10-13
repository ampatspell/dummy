import { Model } from '$lib/firebase/fire/model.svelte';
import { getter } from '$lib/utils/options';
import { Property } from '$lib/utils/property.svelte';
import type { BlocksModel } from '../../models/blocks.svelte';
import type { BlockModel, BlockReferenceData } from './block.svelte';

export type BlockReferenceOptions = {
  isEditing: boolean;
  data: BlockReferenceData | undefined;
  update: (data: BlockReferenceData | undefined) => void;
  blocks: BlocksModel;
};

export class BlockReference extends Model<BlockReferenceOptions> {
  id = $derived(this.options.data?.id);
  _blocks = $derived(this.options.blocks);
  isDisabled = $derived(!this.options.isEditing);

  blocks = $derived(this._blocks.all);

  content = $derived.by(() => {
    const id = this.id;
    if (id) {
      return this._blocks.byId(id);
    }
  });

  update(block: BlockModel | undefined) {
    let data = undefined;
    if (block) {
      const id = block.id;
      data = { id };
    }
    this.options.update(data);
  }

  property = new Property({
    delegate: this,
    value: getter(() => this.content),
    update: (block?: BlockModel) => {
      this.update(block);
    },
  });
}
