import type { BlockData, BlockTypes, GridBlockData, PlaceholderBlockData, TextBlockData } from '$lib/utils/types';
import {
  GridBlockModel,
  PlaceholderBlockModel,
  TextBlockModel,
  type BlockModel,
  type BlockModelOptions,
  type DocumentBlockModel,
} from './block.svelte';
import { Document } from '$lib/firebase/fire/document.svelte';
import { Model } from '$lib/firebase/fire/model.svelte';
import { getter } from '$lib/utils/options';
import type { BlocksModel } from '../blocks.svelte';

export type BlockDefinitionModelOptions = {
  blocks: BlocksModel;
};

export abstract class BlockDefinitionModel<
  M extends BlockModel<BlockModelOptions, D>,
  D extends BlockData,
  O extends BlockDefinitionModelOptions = BlockDefinitionModelOptions,
> extends Model<O> {
  blocks = $derived(this.options.blocks);

  abstract createModelForDocument(doc: Document<D>): DocumentBlockModel<D>;
}

export class GridBlockDefinitionModel extends BlockDefinitionModel<GridBlockModel, GridBlockData> {
  createModelForDocument(doc: Document<GridBlockData>) {
    return new GridBlockModel({ blocks: getter(() => this.blocks), doc });
  }
}

export class PlaceholderBlockDefinitionModel extends BlockDefinitionModel<PlaceholderBlockModel, PlaceholderBlockData> {
  createModelForDocument(doc: Document<PlaceholderBlockData>) {
    return new PlaceholderBlockModel({ blocks: getter(() => this.blocks), doc });
  }
}

export class TextBlockDefinitionModel extends BlockDefinitionModel<TextBlockModel, TextBlockData> {
  createModelForDocument(doc: Document<TextBlockData>) {
    return new TextBlockModel({ blocks: getter(() => this.blocks), doc });
  }
}

export type BlockDefinitionsModelOptions = {
  blocks: BlocksModel;
};

export class BlockDefinitionsModel extends Model<BlockDefinitionsModelOptions> {
  private types: {
    [type in BlockTypes]: BlockDefinitionModel<
      BlockModel<BlockModelOptions, BlockData>,
      BlockData,
      BlockDefinitionModelOptions
    >;
  } = $derived.by(() => {
    const opts = {
      blocks: getter(() => this.options.blocks),
    };
    return {
      grid: new GridBlockDefinitionModel(opts),
      placeholder: new PlaceholderBlockDefinitionModel(opts),
      text: new TextBlockDefinitionModel(opts),
    };
  });

  forType(type: BlockTypes) {
    return this.types[type];
  }
}
