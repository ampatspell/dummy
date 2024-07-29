import type { Document } from '$lib/firebase/fire/document.svelte';
import { Model } from '$lib/firebase/fire/model.svelte';
import { MapModels } from '$lib/firebase/fire/models.svelte';
import { getter, type OptionsInput } from '$lib/utils/options';
import type {
  BlockData,
  GridBlockAreaData,
  GridBlockData,
  PlaceholderBlockData,
  TextBlockData,
} from '$lib/utils/types';
import { BlockByIdReference } from './reference.svelte';

export type BlockModelOptions = {
  doc: Document<BlockData>;
  blocks: BlockModel[];
  isEditing: boolean;
};

export class BlockModel<D extends BlockData = BlockData> extends Model<BlockModelOptions> {
  doc = $derived(this.options.doc as Document<D>);
  id = $derived(this.doc.id);
  data = $derived(this.doc.data);
  type = $derived(this.data?.type);

  isEditing = $derived(this.options.isEditing);
}

export class TextBlockModel extends BlockModel<TextBlockData> {
  text = $derived(this.data?.text);

  updateText(value: string) {
    this.data!.text = value;
    this.doc.scheduleSave();
  }
}

export class PlaceholderBlockModel extends BlockModel<PlaceholderBlockData> {}

export type GridBlockAreaModelOptions = {
  blocks: BlockModel[];
  area: GridBlockAreaData;
};

export class GridBlockAreaModel extends Model<GridBlockAreaModelOptions> {
  placement = $derived(this.options.area.placement);
  _block = $derived(this.options.area.block);

  block = new BlockByIdReference({
    blocks: getter(() => this.options.blocks),
    id: getter(() => this._block),
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

type BlockModelFactory = { new (opts: OptionsInput<BlockModelOptions>): BlockModel };

export const createBlockModel = (
  doc: Document<BlockData>,
  opts: OptionsInput<Omit<BlockModelOptions, 'doc'>>,
): BlockModel | undefined => {
  const create = (factory: BlockModelFactory) => new factory({ doc, ...opts });
  switch (doc.data?.type) {
    case 'text':
      return create(TextBlockModel);
    case 'placeholder':
      return create(PlaceholderBlockModel);
    case 'grid':
      return create(GridBlockModel);
  }
};
