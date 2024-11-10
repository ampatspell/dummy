import type { Component } from 'svelte';
import type { PageModel, PageSettingsModel } from '../pages/page.svelte';
import { Model } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';
import { getter } from '../utils/options';

export type PageComponent = Component<{ page: PageModel }>;

export type PageDefinitionModelOptions<S extends Record<string, unknown> = Record<string, unknown>> = {
  id: string;
  name: string;
  frontend: PageComponent;
  page: {
    component: PageComponent;
    settings: (page: PageModel) => PageSettingsModel<S>;
  };
  defaults: S;
};

export type PageDefinitionBackendModelOptions<S extends Record<string, unknown> = Record<string, unknown>> = {
  page: {
    component: PageComponent;
    settings: (page: PageModel) => PageSettingsModel<S>;
  };
};

export class PageDefinitionBackendModel<S extends Record<string, unknown> = Record<string, unknown>> extends Model<
  PageDefinitionBackendModelOptions<S>
> {
  readonly component = $derived(this.options.page.component);

  settings(page: PageModel) {
    return this.options.page.settings(page);
  }
}

export class PageDefinitionModel<S extends Record<string, unknown> = Record<string, unknown>> extends Model<
  PageDefinitionModelOptions<S>
> {
  readonly id = $derived(this.options.id);
  readonly name = $derived(this.options.name);
  readonly frontend = $derived(this.options.frontend);
  readonly defaults = $derived(this.options.defaults);

  readonly backend = new PageDefinitionBackendModel<S>({
    page: getter(() => this.options.page),
  });

  readonly serialized = $derived(serialized(this, ['id']));
}

export type PageDefinitionsModelOptions = {
  definitions: PageDefinitionModelOptions[];
};

export class PageDefinitionsModel extends Model<PageDefinitionsModelOptions> {
  readonly definitions = $derived(this.options.definitions.map((opts) => new PageDefinitionModel(opts)));

  page(id: string) {
    return this.definitions.find((page) => page.id === id);
  }

  get defaults() {
    const { id, defaults: settings } = this.definitions[0]!;
    return {
      id,
      settings,
    };
  }
}
