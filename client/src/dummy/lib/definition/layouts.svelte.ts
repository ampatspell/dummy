import type { Component, Snippet } from 'svelte';
import { Model } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';
import type { LayoutModel, LayoutSettingsModel } from '../layouts/layout.svelte';

export type LayoutFrontendComponent = Component<{ children: Snippet; layout: LayoutModel }>;
export type LayoutBackendComponent = Component<{ layout: LayoutModel }>;

export type LayoutDefinitionsModelOptions = {
  definitions: LayoutDefinitionModelOptions[];
};

export class LayoutDefinitionsModel extends Model<LayoutDefinitionsModelOptions> {
  readonly definitions = $derived(this.options.definitions.map((opts) => new LayoutDefinitionModel(opts)));

  layout(id: string) {
    return this.definitions.find((layout) => layout.id === id);
  }

  get defaults() {
    const { id: definition, name, defaults: layout } = this.definitions[0]!;
    return {
      definition,
      name,
      settings: {
        layout,
        pages: {},
      },
    };
  }
}

export type LayoutDefinitionModelOptions<S extends Record<string, unknown> = Record<string, unknown>> = {
  id: string;
  name: string;
  frontend: LayoutFrontendComponent;
  backend: LayoutBackendComponent;
  defaults: S;
  settings: (layout: LayoutModel) => LayoutSettingsModel<S>;
};

export class LayoutDefinitionModel<S extends Record<string, unknown> = Record<string, unknown>> extends Model<
  LayoutDefinitionModelOptions<S>
> {
  readonly id = $derived(this.options.id);
  readonly name = $derived(this.options.name);
  readonly frontend = $derived(this.options.frontend);
  readonly backend = $derived(this.options.backend);

  readonly defaults = $derived(this.options.defaults);

  settings(layout: LayoutModel) {
    return this.options.settings(layout);
  }

  readonly serialized = $derived(serialized(this, ['id']));
}
