import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import { LayoutModel } from '$dummy/lib/layouts/layout.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const layout = LayoutModel.buildById(event.params.id);
  return {
    id: event.params.id,
    layout: await preloadModel(layout),
  };
};
