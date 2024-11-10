import { Model } from '../firebase/fire/model.svelte';
import { LayoutDefinitionsModel, type LayoutDefinitionsModelOptions } from './layouts.svelte';
import { PageDefinitionsModel, type PageDefinitionsModelOptions } from './pages.svelte';

export type SiteDefinitionModelOptions = {
  pages: PageDefinitionsModelOptions;
  layouts: LayoutDefinitionsModelOptions;
};

export class SiteDefinitionModel extends Model<SiteDefinitionModelOptions> {
  readonly pages = $derived(new PageDefinitionsModel(this.options.pages));
  readonly layouts = $derived(new LayoutDefinitionsModel(this.options.layouts));
}
