import { getter, options, type OptionsInput } from '$lib/utils/options';
import type { BlockModel } from './block.svelte';

export type ExistingBlockOptions = {
  block: BlockModel | undefined;
};

export class ExistingBlock {
  options: ExistingBlockOptions;

  constructor(opts: OptionsInput<ExistingBlockOptions>) {
    this.options = options(opts);
  }

  content = $derived.by(() => {
    const block = this.options.block;
    if (block?.exists) {
      return block;
    }
  });
}

export class MutableExistingBlock {
  value = $state<BlockModel>();

  existing = new ExistingBlock({
    block: getter(() => this.value),
  });

  content = $derived(this.existing.content);
}
