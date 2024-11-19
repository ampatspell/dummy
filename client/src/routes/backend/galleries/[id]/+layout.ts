import { GalleryModel } from '$dummy/lib/assets/gallery.svelte';
import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const gallery = GalleryModel.buildById(event.params.id);
  return {
    gallery: await preloadModel(gallery),
  };
};
