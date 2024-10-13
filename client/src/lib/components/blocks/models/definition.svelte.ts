import { Model } from '$lib/firebase/fire/model.svelte';
import { MapModels } from '$lib/firebase/fire/models.svelte';
import { serialized } from '$lib/utils/object';
import { getter } from '$lib/utils/options';
import type { Component } from 'svelte';
import type { BlockModel } from '../block/models/block.svelte';

export type BlocksDefinitionModelOptions = {
  blocks: BlockDefinitionModelBlockOptions[];
};

export class BlocksDefinitionModel extends Model<BlocksDefinitionModelOptions> {
  _all = new MapModels({
    source: getter(() => this.options.blocks),
    target: (block) =>
      new BlockDefinitionModel({
        block,
        blocks: this,
      }),
  });

  all = $derived(this._all.content);

  byId(id: string) {
    return this.all.find((def) => def.id === id);
  }
}

export type BlockDefinitionModelPropType = {
  id: string;
  type: 'string' | 'block';
};

export type BlockDefinitionModelBlockOptions = {
  id: string;
  component: Component<{ block: BlockModel }>;
  props: BlockDefinitionModelPropType[];
};

export type BlockDefinitionModelOptions = {
  block: BlockDefinitionModelBlockOptions;
  blocks: BlocksDefinitionModel;
};

export class BlockDefinitionModel extends Model<BlockDefinitionModelOptions> {
  id = $derived(this.options.block.id);
  component = $derived(this.options.block.component);

  props = new BlockDefinitionPropsModel({
    props: getter(() => this.options.block.props),
  });

  serialized = $derived(serialized(this, ['id']));
}

export type BlockDefinitionPropsModelOptions = {
  props: BlockDefinitionModelPropType[];
};

export class BlockDefinitionPropsModel extends Model<BlockDefinitionPropsModelOptions> {
  _all = new MapModels({
    source: getter(() => this.options.props),
    target: (definition) => new BlockDefinitionPropModel({ definition }),
  });

  all = $derived(this._all.content);
}

export type BlockDefinitionPropModelOptions = {
  definition: BlockDefinitionModelPropType;
};

export class BlockDefinitionPropModel extends Model<BlockDefinitionPropModelOptions> {
  id = $derived(this.options.definition.id);
  type = $derived(this.options.definition.type);
}
