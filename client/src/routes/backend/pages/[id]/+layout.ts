import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import { PageModel } from '$dummy/lib/pages/page.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const page = PageModel.buildById({ id: event.params.id });
  return {
    page: await preloadModel(page, () => page.settings?.isLoaded),
  };
};
