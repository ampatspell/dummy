import { Model } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';

export type PageDefinitionModelOptions = {
  id: string;
  name: string;
};

export class PageDefinitionModel extends Model<PageDefinitionModelOptions> {
  id = $derived(this.options.id);
  name = $derived(this.options.name);

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
}

export const definePages = () => {};
