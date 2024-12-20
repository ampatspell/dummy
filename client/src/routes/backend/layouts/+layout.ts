import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import { buildLayoutsModel } from '$dummy/lib/layouts/layouts.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const id = event.params.id;
  const { site } = await event.parent();
  const layouts = buildLayoutsModel({ site });
  return {
    id,
    layouts: await preloadModel(layouts),
  };
};
