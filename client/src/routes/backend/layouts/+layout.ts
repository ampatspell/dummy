import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import { buildLayoutsModel } from '$dummy/lib/layouts/layouts.svelte';
import { buildSiteModel } from '$dummy/lib/site/site.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const id = event.params.id;
  const site = buildSiteModel();
  const layouts = buildLayoutsModel({ site });
  return {
    id,
    site: await preloadModel(site),
    layouts: await preloadModel(layouts),
  };
};
