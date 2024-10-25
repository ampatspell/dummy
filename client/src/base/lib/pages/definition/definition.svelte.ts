import type { OptionsInput } from '$base/lib/utils/options';
import type { Component } from 'svelte';
import { Model } from '../../firebase/fire/model.svelte';
import { serialized } from '../../utils/object';
import type { PageModel } from '../page.svelte';

export type PageComponent = Component<{ page: PageModel }>;

export type PageDefinitionModelOptions = {
  id: string;
  name: string;
  component: PageComponent;
};

export class PageDefinitionModel extends Model<PageDefinitionModelOptions> {
  id = $derived(this.options.id);
  name = $derived(this.options.name);
  component = $derived(this.options.component);

  constructor(...args: ConstructorParameters<typeof Model<PageDefinitionModelOptions>>) {
    super(...args);
  }

  readonly serialized = $derived(serialized(this, ['id']));
}

export type PageDefinitionsModelOptions = {
  pages: PageDefinitionModelOptions[];
};

export class PageDefinitionsModel extends Model<PageDefinitionsModelOptions> {
  pages = $derived(this.options.pages.map((opts) => new PageDefinitionModel(opts)));

  page(id: string) {
    return this.pages.find((page) => page.id === id);
  }
}

let definitions = $state<PageDefinitionsModel>();

export const createPageDefinitions = (opts: OptionsInput<PageDefinitionsModelOptions>) => {
  definitions = new PageDefinitionsModel(opts);
  return definitions;
};

export const getPageDefinitions = () => {
  return definitions!;
};
