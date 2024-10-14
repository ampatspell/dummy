import type { Document } from '$lib/firebase/fire/document.svelte';
import { Model } from '$lib/firebase/fire/model.svelte';
import type { OptionsInput } from '$lib/utils/options';
import type { BlockData, BlockModel, BlockModelOptions } from '../block/models/block.svelte';
import type { BlocksModel } from './blocks.svelte';

export type BlockDefinition = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  factory: { new (opts: OptionsInput<BlockModelOptions<any>>): BlockModel };
};

export type BlocksDefinitionModelOptions = {
  blocks: BlockDefinition[];
};

export class BlocksDefinitionModel extends Model<BlocksDefinitionModelOptions> {
  createBlock(blocks: BlocksModel, doc: Document<BlockData>): BlockModel | undefined {
    const type = doc.data?.type;
    if (type) {
      const definition = this.options.blocks.find((def) => def.type === type);
      if (definition) {
        return new definition.factory({ blocks, doc });
      }
    }
  }
}
