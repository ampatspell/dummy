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
  pages: PageDefinitionsModelOptions;
  layouts: LayoutDefinitionsModelOptions;
};

export class SiteDefinitionModel extends Model<SiteDefinitionModelOptions> {
  readonly pages = $derived(new PageDefinitionsModel(this.options.pages));
  readonly layouts = $derived(new LayoutDefinitionsModel(this.options.layouts));
}

export type BuildSiteDefinitionContext = {
  layout: <S extends Record<string, unknown>>(opts: LayoutDefinitionModelOptions<S>) => void;
  page: <S extends Record<string, unknown>>(opts: PageDefinitionModelOptions<S>) => void;
};

export const buildSiteDefinition = (cb: (ctx: BuildSiteDefinitionContext) => void) => {
  const definition: SiteDefinitionModelOptions = {
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
  });
  return definition;
};
