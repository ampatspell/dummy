import type { Document } from '$lib/firebase/fire/document.svelte';
import { Model } from '$lib/firebase/fire/model.svelte';
import { MapModels } from '$lib/firebase/fire/models.svelte';
import { getter } from '$lib/utils/options';
import type { BlocksModel } from '../blocks.svelte';
import type { BlockData, GridBlockAreaData, GridBlockData, PlaceholderBlockData, TextBlockData } from '../../data';
import { BlockByIdReference } from './reference.svelte';

export type BlockModelOptions = {
  doc: Document<BlockData>;
  blocks: BlocksModel;
};

export class BlockModel<D extends BlockData = BlockData> extends Model<BlockModelOptions> {
  doc = $derived(this.options.doc as Document<D>);
  id = $derived(this.doc.id);
  data = $derived(this.doc.data);
  type = $derived(this.data?.type);
}

export class TextBlockModel extends BlockModel<TextBlockData> {
  text = $derived(this.data?.text);
}

export class PlaceholderBlockModel extends BlockModel<PlaceholderBlockData> {}

export type GridBlockAreaModelOptions = {
  blocks: BlocksModel;
  area: GridBlockAreaData;
};

export class GridBlockAreaModel extends Model<GridBlockAreaModelOptions> {
  placement = $derived(this.options.area.placement);
  blockId = $derived(this.options.area.block);

  block = new BlockByIdReference({
    blocks: getter(() => this.options.blocks.all),
    id: getter(() => this.blockId),
  });
}

export class GridBlockModel extends BlockModel<GridBlockData> {
  columns = $derived(this.data?.columns);
  rows = $derived(this.data?.rows);

  _areas = new MapModels({
    source: getter(() => this.data?.areas ?? []),
    target: (area) => new GridBlockAreaModel({ area, blocks: getter(() => this.options.blocks) }),
  });

  areas = $derived(this._areas.content);
}

export const createBlockModel = (opts: BlockModelOptions): BlockModel | undefined => {
  switch (opts.doc.data?.type) {
    case 'text':
      return new TextBlockModel(opts);
    case 'placeholder':
      return new PlaceholderBlockModel(opts);
    case 'grid':
      return new GridBlockModel(opts);
  }
};
