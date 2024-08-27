import { getter, options, type OptionsInput } from '$lib/utils/options';
import type { BlocksModel } from '../blocks.svelte';
import type { BlockModel } from './block.svelte';

export type BaseBlockReference<T extends BlockModel = BlockModel> = {
  state: string;
} | {
  state: 'blank';
} | {
  state: 'exists';
  block: T;
} | {
  state: 'missing';
  message: string;
};

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

  type = $derived.by(() => this.options.type);
  value = $derived.by(() => this.options.value);

  get content() {
    if (this.value !== undefined) {
      return this.options.find();
    }
  }
}

export type BlockByIdReferenceOptions = {
  id?: string;
  blocks: BlocksModel;
};

export class BlockByIdReference extends BlockReference {
  constructor(_opts: OptionsInput<BlockByIdReferenceOptions>) {
    const opts = options(_opts);
    super({
      find: () => {
        const id = opts.id;
        if(id) {
          return opts.blocks.byId(id);
        }
      },
      type: 'id',
      value: getter(() => opts.id),
    });
  }
}
