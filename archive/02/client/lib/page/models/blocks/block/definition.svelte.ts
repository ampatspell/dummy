import type { BlockData, BlockType, GridBlockData, PlaceholderBlockData, TextBlockData } from '$lib/utils/types';
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
import { doc, setDoc } from '@firebase/firestore';

export type BlockDefinitionModelOptions = {
  blocks: BlocksModel;
};

export abstract class BlockDefinitionModel<
  M extends DocumentBlockModel<D>,
  D extends BlockData,
  O extends BlockDefinitionModelOptions = BlockDefinitionModelOptions,
> extends Model<O> {
  blocks = $derived(this.options.blocks);

  abstract modelForDocument(doc: Document<D>): DocumentBlockModel<D>;

  protected async createNewWithData(data: D) {
    const { blocks } = this;
    const { collectionRef } = blocks;
    if (collectionRef) {
      const ref = doc(collectionRef);
      await setDoc(ref, data);
      return blocks.byId(ref.id) as unknown as M;
    }
  }

  abstract createNew(): Promise<M | undefined>;
}

export class GridBlockDefinitionModel extends BlockDefinitionModel<GridBlockModel, GridBlockData> {
  modelForDocument(doc: Document<GridBlockData>) {
    return new GridBlockModel({ blocks: getter(() => this.blocks), doc });
  }

  async createNew() {
    return await this.createNewWithData({
      type: 'grid',
      areas: [],
      columns: [],
      rows: [],
    });
  }
}

export class PlaceholderBlockDefinitionModel extends BlockDefinitionModel<PlaceholderBlockModel, PlaceholderBlockData> {
  modelForDocument(doc: Document<PlaceholderBlockData>) {
    return new PlaceholderBlockModel({ blocks: getter(() => this.blocks), doc });
  }

  async createNew() {
    return await this.createNewWithData({
      type: 'placeholder',
    });
  }
}

export class TextBlockDefinitionModel extends BlockDefinitionModel<TextBlockModel, TextBlockData> {
  modelForDocument(doc: Document<TextBlockData>) {
    return new TextBlockModel({ blocks: getter(() => this.blocks), doc });
  }

  async createNew() {
    return await this.createNewWithData({
      type: 'text',
      text: 'To whom it may concern: It is springtime. It is late afternoon.',
    });
  }
}

export type BlockDefinitionsModelOptions = {
  blocks: BlocksModel;
};

export class BlockDefinitionsModel extends Model<BlockDefinitionsModelOptions> {
  private types: {
    [type in BlockType]: BlockDefinitionModel<DocumentBlockModel<BlockData>, BlockData, BlockDefinitionModelOptions>;
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

  byType(type: BlockType) {
    return this.types[type];
  }
}
