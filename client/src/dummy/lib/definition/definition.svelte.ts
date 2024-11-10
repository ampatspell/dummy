import type { OptionsInput } from '$dummy/lib/utils/options';
import { SiteDefinitionModel, type SiteDefinitionModelOptions } from './site.svelte';

let site = $state<SiteDefinitionModel>();

export const createSiteDefinition = (opts: OptionsInput<SiteDefinitionModelOptions>) => {
  site = new SiteDefinitionModel(opts);
  return site;
};

export const getSiteDefinition = () => {
  return site!;
};
