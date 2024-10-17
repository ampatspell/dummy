import { BlockModel, type BlockData } from '$lib/components/blocks/block/models/block.svelte';
import { getter } from '$lib/utils/options';
import { Property } from '$lib/utils/property.svelte';
import Component from './component.svelte';
import Inspector from './inspector.svelte';

export type HamsterBlockData = BlockData & {
  type: 'hamster';
  greeting?: string;
};

export class HamsterBlockModel extends BlockModel<HamsterBlockData> {
  component = Component;
  inspector = Inspector;

  greeting = new Property<string | undefined>({
    delegate: this,
    value: getter(() => this._data.greeting),
    update: (value) => this.update((data) => (data.greeting = value)),
  });
}
