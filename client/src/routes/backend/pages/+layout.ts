import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import { PagesModel } from '$dummy/lib/pages/pages.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const id = event.params.id;
  const pages = PagesModel.build();
  return {
    id,
    pages: await preloadModel(pages),
  };
};
