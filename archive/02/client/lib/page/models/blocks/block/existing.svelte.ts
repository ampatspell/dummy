import { getter, options, type OptionsInput } from '$lib/utils/options';
import type { BlockModel } from './block.svelte';

export type ExistingBlockOptions = {
  blocks: BlockModel[];
  block: BlockModel | undefined;
};

export class ExistingBlock {
  options: ExistingBlockOptions;

  constructor(opts: OptionsInput<ExistingBlockOptions>) {
    this.options = options(opts);
  }

  blocks = $derived.by(() => this.options.blocks);

  content = $derived.by(() => {
    const block = this.options.block;
    if (block && block.exists && this.blocks.includes(block)) {
      return block;
    }
  });
}

export type MutableExistingBlockOptions = {
  blocks: BlockModel[];
};

export class MutableExistingBlock {
  value = $state<BlockModel>();
  options: MutableExistingBlockOptions;

  constructor(opts: OptionsInput<MutableExistingBlockOptions>) {
    this.options = options(opts);
  }

  blocks = $derived.by(() => this.options.blocks);

  existing = new ExistingBlock({
    blocks: getter(() => this.blocks),
    block: getter(() => this.value),
  });

  content = $derived(this.existing.content);
}
