import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import { SiteModel } from '$dummy/lib/site/site.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
  const site = new SiteModel({});
  return {
    site: await preloadModel(site),
  };
};
