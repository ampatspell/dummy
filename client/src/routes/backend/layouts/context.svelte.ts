import { buildSiteModel } from '$dummy/lib/site/site.svelte';
import { getContext, setContext } from 'svelte';

class SiteContext {
  site = $derived(buildSiteModel());
}

const KEY = 'site';

export const createSiteContext = () => {
  return setContext(KEY, new SiteContext());
};

export const getSiteContext = () => {
  return getContext(KEY) as SiteContext;
};
