import { createContext } from '$lib/utils/context';
import type { Component, Snippet } from 'svelte';

export type LayoutDefinition = {
  theme: Component<{ children: Snippet<[]> }>;
};

export class LayoutContext {
  private readonly definition: LayoutDefinition;

  constructor(definition: LayoutDefinition) {
    this.definition = definition;
  }

  theme = $derived.by(() => this.definition.theme);
}

const { get: getLayoutContext, set: setLayoutContext } = createContext<LayoutContext>('layout');

export {
  getLayoutContext,
  setLayoutContext,
};
