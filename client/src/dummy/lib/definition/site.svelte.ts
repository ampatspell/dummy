import { Model } from '../firebase/fire/model.svelte';
import {
  LayoutDefinitionsModel,
  type LayoutDefinitionModelOptions,
  type LayoutDefinitionsModelOptions,
} from './layouts.svelte';
import {
  PageDefinitionsModel,
  type PageDefinitionModelOptions,
  type PageDefinitionsModelOptions,
} from './pages.svelte';

export type SiteDefinitionModelOptions = {
  name: string;
  pages: PageDefinitionsModelOptions;
  layouts: LayoutDefinitionsModelOptions;
};

export class SiteDefinitionModel extends Model<SiteDefinitionModelOptions> {
  readonly name = $derived(this.options.name);
  readonly pages = $derived(new PageDefinitionsModel(this.options.pages));
  readonly layouts = $derived(new LayoutDefinitionsModel(this.options.layouts));
}

export type BuildSiteDefinitionContext = {
  layout: <S extends Record<string, unknown>>(opts: LayoutDefinitionModelOptions<S>) => void;
  page: <S extends Record<string, unknown>>(opts: PageDefinitionModelOptions<S>) => void;
  site: (opts: { name: string }) => void;
};

export const buildSiteDefinition = (cb: (ctx: BuildSiteDefinitionContext) => void) => {
  const definition: SiteDefinitionModelOptions = {
    name: 'dummy',
    layouts: {
      definitions: [],
    },
    pages: {
      definitions: [],
    },
  };
  cb({
    layout: (opts) => definition.layouts.definitions.push(opts),
    page: (opts) => definition.pages.definitions.push(opts),
    site: (opts) => {
      definition.name = opts.name;
    },
  });
  return definition;
};
