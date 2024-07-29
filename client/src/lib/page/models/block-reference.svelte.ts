import { getter, options, type OptionsInput } from "$lib/utils/options";
import type { BlockModel } from "./block.svelte";

export type BlockReferenceOptions = {
  find: () => BlockModel | undefined;
  type: string;
  value?: string;
};

export class BlockReference {
  options: BlockReferenceOptions;

  constructor(opts: OptionsInput<BlockReferenceOptions>) {
    this.options = options(opts);
  }

  type = $derived.by(() => this.options.type)
  value = $derived.by(() => this.options.value);

  get content() {
    if(this.value !== undefined) {
      return this.options.find();
    }
  }
}

export type BlockByIdReferenceOptions = {
  id?: string;
  blocks: BlockModel[];
};

export class BlockByIdReference extends BlockReference {
  constructor(_opts: OptionsInput<BlockByIdReferenceOptions>) {
    const opts = options(_opts);
    super({
      find: () => {
        const id = opts.id;
        return opts.blocks.find(block => block.id === id);
      },
      type: 'id',
      value: getter(() => opts.id),
    });
  }
}
