import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import { buildSiteModel } from '$dummy/lib/site/site.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
  const site = buildSiteModel();
  return {
    site: await preloadModel(site),
  };
};
