import type { Document } from '$lib/firebase/fire/document.svelte';
import { Model } from '$lib/firebase/fire/model.svelte';
import { MapModels } from '$lib/firebase/fire/models.svelte';
import { removeObject } from '$lib/utils/array';
import { getter, options, type OptionsInput } from '$lib/utils/options';
import { Property } from '$lib/utils/property.svelte';
import type {
  BlockData,
  GridBlockAreaData,
  GridBlockData,
  PlaceholderBlockData,
  TextBlockData,
} from '$lib/utils/types';
import type { BlocksModel } from '../blocks.svelte';
import { blockByIdReference, type BlockReference } from './reference.svelte';

class BlockProperties<D, B extends BlockModel<BlockModelOptions, D>> {
  block: B;

  constructor(block: B) {
    this.block = block;
  }

  isDisabled = $derived.by(() => !this.block.isEditable);

  data = $derived.by(() => this.block.data);

  update(cb: (data: D) => void) {
    this.block.update(cb);
  }
}

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

export abstract class BlockModel<O extends BlockModelOptions = BlockModelOptions, D = unknown> extends Model<O> {
  blocks = $derived(this.options.blocks);

  isEditable = $derived(this.blocks.isEditable);
  isSelected: boolean = $derived(this.blocks.selected === this);
  isEditing: boolean = $derived(this.blocks.editing === this);

  abstract data: D | undefined;
  abstract update(cb: (data: D) => void): void;
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

  abstract delete(): Promise<void>;
}

export type DocumentBlockModelOptions = {
  doc: Document<BlockData>;
} & BlockModelOptions;

export abstract class DocumentBlockModel<D extends BlockData = BlockData> extends BlockModel<
  DocumentBlockModelOptions,
  D
> {
  doc = $derived(this.options.doc as Document<D>);
  id = $derived(this.doc.id);
  exists = $derived(this.doc.exists);
  data = $derived(this.doc.data!);
  type = $derived(this.data?.type);

  async update(cb: (data: D) => void) {
    const data = this.data;
    if (data) {
      cb(data);
      await this.doc.save();
    }
  }

  async delete() {
    await this.doc.delete();
  }
}

export type DataBlockModelOptions<D> = {
  parent: DocumentBlockModel;
  data: D;
  delete: (data: D) => Promise<void>;
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

  async delete() {
    await this.options.delete(this.data);
  }
}

class TextBlockProperties extends BlockProperties<TextBlockData, TextBlockModel> {
  text = new Property({
    delegate: this,
    value: getter(() => this.data?.text),
    update: (value) => this.update((data) => (data.text = value ?? '')),
  });
}

export class TextBlockModel extends DocumentBlockModel<TextBlockData> {
  text = $derived(this.data?.text);
  fontSize = $derived(this.data?.fontSize);

  properties = new TextBlockProperties(this);

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

export class GridAreaBlockModel extends DataBlockModel<GridBlockAreaData> {
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

  _areas: MapModels<GridBlockAreaData, GridAreaBlockModel> = new MapModels({
    source: getter(() => this.data?.areas ?? []),
    target: (data) => {
      return new GridAreaBlockModel({
        data,
        parent: this,
        blocks: getter(() => this.options.blocks),
        delete: (area) => this.update((data) => removeObject(data.areas, area)),
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
