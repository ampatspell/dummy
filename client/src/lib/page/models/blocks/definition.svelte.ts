import { Model } from '$lib/firebase/fire/model.svelte';
import { MapModels } from '$lib/firebase/fire/models.svelte';
import { serialized } from '$lib/utils/object';
import { getter } from '$lib/utils/options';
import type { Component } from 'svelte';

export type BlocksDefinitionModelOptions = {
  blocks: BlockDefinitionModelOptions['block'][];
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

export type BlockDefinitionModelOptions = {
  block: {
    id: string;
    component: Component;
  };
  blocks: BlocksDefinitionModel;
};

export class BlockDefinitionModel extends Model<BlockDefinitionModelOptions> {
  id = $derived(this.options.block.id);
  component = $derived(this.options.block.component);

  serialized = $derived(serialized(this, ['id']));
}
