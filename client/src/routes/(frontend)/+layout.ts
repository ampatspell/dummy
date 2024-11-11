import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import { LayoutRuntimeModel } from '$dummy/lib/pages/runtime.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const { site } = await event.parent();
  const layout = new LayoutRuntimeModel({ site });
  return {
    layout: await preloadModel(layout),
  };
};
