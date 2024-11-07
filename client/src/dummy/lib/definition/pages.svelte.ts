import type { Component } from 'svelte';
import type { PageModel, PageSettingsModel } from '../pages/page.svelte';
import { Model } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';

export type PageComponent = Component<{ page: PageModel }>;

export type PageDefinitionModelOptions<S extends Record<string, unknown> = Record<string, unknown>> = {
  id: string;
  name: string;
  frontend: PageComponent;
  backend: PageComponent;
  defaults: S;
  settings: (page: PageModel) => PageSettingsModel<S>;
};

export class PageDefinitionModel<S extends Record<string, unknown> = Record<string, unknown>> extends Model<
  PageDefinitionModelOptions<S>
> {
  id = $derived(this.options.id);
  name = $derived(this.options.name);
  frontend = $derived(this.options.frontend);
  backend = $derived(this.options.backend);
  defaults = $derived(this.options.defaults);

  settings(page: PageModel) {
    return this.options.settings(page);
  }

  readonly serialized = $derived(serialized(this, ['id']));
}

export type PageDefinitionsModelOptions = {
  definitions: PageDefinitionModelOptions[];
};

export class PageDefinitionsModel extends Model<PageDefinitionsModelOptions> {
  pages = $derived(this.options.definitions.map((opts) => new PageDefinitionModel(opts)));

  page(id: string) {
    return this.pages.find((page) => page.id === id);
  }

  get defaults() {
    const page = this.pages[0]!;
    return {
      id: page.id,
      settings: page.defaults,
    };
  }
}
