import type { BlocksModel } from '../blocks.svelte';
import type { BlockModel } from './block.svelte';

export type BlockReference<T extends BlockModel = BlockModel> = {
  state: 'blank';
} | {
  state: 'exists';
  content: T;
} | {
  state: 'missing';
  message: string;
};

export type BlockByIdReferenceOptions = {
  id?: string;
  blocks: BlocksModel;
};

export const blockByIdReference = (opts: BlockByIdReferenceOptions): BlockReference => {
  const id = opts.id;
  if(id) {
    const content = opts.blocks.byId(id);
    if(!content) {
      return {
        state: 'missing',
        message: `Block '${id}' is missing`,
      };
    }
    return {
      state: 'exists',
      content
    };
  } else {
    return {
      state: 'blank'
    };
  }
}
