import type { Document } from '$lib/firebase/fire/document.svelte';
import { Model } from '$lib/firebase/fire/model.svelte';
import { MapModels } from '$lib/firebase/fire/models.svelte';
import { getter, options, type OptionsInput } from '$lib/utils/options';
import type {
  BlockData,
  GridBlockAreaData,
  GridBlockData,
  PlaceholderBlockData,
  TextBlockData,
  ValueWithUnit,
} from '$lib/utils/types';
import type { BlocksModel } from '../blocks.svelte';
import { blockByIdReference, type BlockReference } from './reference.svelte';

export type BlockInfoModelOptions = {
  type: string;
  description?: string;
};

export class BlockInfoModel {
  options: BlockInfoModelOptions;

  constructor(opts: OptionsInput<BlockInfoModelOptions>) {
    this.options = options(opts);
  }

  type = $derived.by(() => this.options.type);
  description = $derived.by(() => this.options.description);
}

export type BlockModelOptions = {
  blocks: BlocksModel;
};

export abstract class BlockModel<O extends BlockModelOptions = BlockModelOptions> extends Model<O> {
  blocks = $derived(this.options.blocks);

  isEditable = $derived(this.blocks.isEditable);
  isSelected: boolean = $derived(this.blocks.selected === this);
  isEditing: boolean = $derived(this.blocks.editing === this);

  abstract exists: boolean | undefined;
  abstract info: BlockInfoModel;
  abstract children: readonly BlockReference[];

  abstract type: BlockData['type'] | undefined; // TODO

  select() {
    this.blocks.select(this);
  }

  edit() {
    this.blocks.edit(this);
  }
}

export type DocumentBlockModelOptions = {
  doc: Document<BlockData>;
} & BlockModelOptions;

export abstract class DocumentBlockModel<
  D extends BlockData = BlockData,
> extends BlockModel<DocumentBlockModelOptions> {
  doc = $derived(this.options.doc as Document<D>);
  id = $derived(this.doc.id);
  exists = $derived(this.doc.exists);
  data = $derived(this.doc.data);
  type = $derived(this.data?.type);

  update(cb: (data: D) => void) {
    const data = this.data;
    if (data) {
      cb(data);
      this.doc.scheduleSave();
    }
  }
}

export type DataBlockModelOptions<D> = {
  parent: DocumentBlockModel;
  data: D;
} & BlockModelOptions;

export abstract class DataBlockModel<D> extends BlockModel<DataBlockModelOptions<D>> {
  data = $derived(this.options.data);
  parent = $derived(this.options.parent);
  exists = $derived(this.parent.exists);
  type = undefined; // TODO

  update(cb: (data: D) => void) {
    const data = this.data;
    if (data) {
      cb(data);
      this.parent.doc.scheduleSave();
    }
  }
}

export class TextBlockModel extends DocumentBlockModel<TextBlockData> {
  text = $derived(this.data?.text);
  fontSize = $derived(this.data?.fontSize);

  updateText(value: string) {
    this.update((data) => {
      data.text = value;
    });
  }

  updateFontSize(value?: ValueWithUnit) {
    this.update((data) => {
      data.fontSize = value;
    });
  }

  info = new BlockInfoModel({
    type: 'Text',
    description: getter(() => this.text),
  });

  children = [];
}

export class PlaceholderBlockModel extends DocumentBlockModel<PlaceholderBlockData> {
  info = new BlockInfoModel({
    type: 'Placeholder',
  });

  children = [];
}

export class GridBlockAreaModel extends DataBlockModel<GridBlockAreaData> {
  placement = $derived(this.data.placement);
  _block = $derived(this.data.block);

  block = $derived(
    blockByIdReference({
      blocks: this.blocks,
      id: this._block,
    }),
  );

  children = $derived([this.block]);

  info = new BlockInfoModel({
    type: 'Grid area',
  });
}

export class GridBlockModel extends DocumentBlockModel<GridBlockData> {
  columns = $derived(this.data?.columns);
  rows = $derived(this.data?.rows);

  _areas: MapModels<GridBlockAreaData, GridBlockAreaModel> = new MapModels({
    source: getter(() => this.data?.areas ?? []),
    target: (data) => {
      return new GridBlockAreaModel({
        data,
        parent: this,
        blocks: getter(() => this.options.blocks),
      });
    },
  });

  areas = $derived(this._areas.content);
  children = $derived<BlockReference[]>(this.areas.map((content) => ({ state: 'exists', content })));

  info: BlockInfoModel = new BlockInfoModel({
    type: 'Grid',
    description: getter(() => `${this.children.length} areas`),
  });
}

type BlockModelFactory = { new (opts: OptionsInput<DocumentBlockModelOptions>): DocumentBlockModel };

export const createDocumentBlockModel = (
  doc: Document<BlockData>,
  opts: OptionsInput<Omit<DocumentBlockModelOptions, 'doc'>>,
): DocumentBlockModel | undefined => {
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