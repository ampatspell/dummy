import { Model } from '$lib/firebase/fire/model.svelte';
import { createContext } from '$lib/utils/context';
import type { Component, Snippet } from 'svelte';

export type LayoutModelOptions = {
  theme: Component<{ children: Snippet<[]> }>;
};

export class LayoutModel extends Model<LayoutModelOptions> {
  theme = $derived(this.options.theme);
}

const { get: getLayout, set: setLayout } = createContext<LayoutModel>('layout');

export const createLayout = (opts: LayoutModelOptions) => setLayout(new LayoutModel(opts));

export { getLayout };
