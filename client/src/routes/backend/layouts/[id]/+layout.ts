import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import { buildLayoutByIdModel } from '$dummy/lib/layouts/layout.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const layout = buildLayoutByIdModel({ id: event.params.id });
  return {
    id: event.params.id,
    layout: await preloadModel(layout),
  };
};
