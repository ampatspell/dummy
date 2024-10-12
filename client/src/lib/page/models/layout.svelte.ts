import { Model } from '$lib/firebase/fire/model.svelte';
import { createContext } from '$lib/utils/context';
import type { Component, Snippet } from 'svelte';
import { BlocksDefinitionModel, type BlocksDefinitionModelOptions } from './blocks/definition.svelte';
import { getter } from '$lib/utils/options';

export type LayoutModelOptions = {
  theme: Component<{ children: Snippet<[]> }>;
  blocks: BlocksDefinitionModelOptions['blocks'];
};

export class LayoutModel extends Model<LayoutModelOptions> {
  isEditing = $state(true);

  theme = $derived(this.options.theme);

  blocks = new BlocksDefinitionModel({
    blocks: getter(() => this.options.blocks),
  });
}

const { get: getLayout, set: setLayout } = createContext<LayoutModel>('layout');

export const createLayout = (opts: LayoutModelOptions) => setLayout(new LayoutModel(opts));

export { getLayout };
