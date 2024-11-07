import type { Component, Snippet } from 'svelte';
import { Model } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';

export type LayoutComponent = Component<{ children: Snippet }>;

export type LayoutDefinitionsModelOptions = {
  definitions: LayoutDefinitionModelOptions[];
};

export class LayoutDefinitionsModel extends Model<LayoutDefinitionsModelOptions> {
  definitions = $derived(this.options.definitions.map((opts) => new LayoutDefinitionModel(opts)));

  layout(id: string) {
    return this.definitions.find((layout) => layout.id === id);
  }

  get defaults() {
    const { id } = this.definitions[0]!;
    return {
      id,
    };
  }
}

export type LayoutDefinitionModelOptions = {
  id: string;
  name: string;
  frontend: LayoutComponent;
};

export class LayoutDefinitionModel extends Model<LayoutDefinitionModelOptions> {
  id = $derived(this.options.id);
  name = $derived(this.options.name);
  frontend = $derived(this.options.frontend);

  readonly serialized = $derived(serialized(this, ['id']));
}
