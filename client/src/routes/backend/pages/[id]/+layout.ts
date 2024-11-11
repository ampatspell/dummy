import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import { buildPageByIdModel } from '$dummy/lib/pages/page.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const page = buildPageByIdModel({ id: event.params.id });
  return {
    page: await preloadModel(page, () => page.settings?.isLoaded),
  };
};
