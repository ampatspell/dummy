import { BlockModel, type BlockData } from '$lib/components/blocks/block/models/block.svelte';
import Component from './component.svelte';
import Inspector from './inspector.svelte';

export type IntroBlockData = BlockData & {
  type: 'intro';
};

export class IntroBlockModel extends BlockModel<IntroBlockData> {
  component = Component;
  inspector = Inspector;
}
