import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import { GalleryModel } from '$dummy/lib/galleries/gallery.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const gallery = GalleryModel.buildById(event.params.id);
  return {
    gallery: await preloadModel(gallery),
  };
};
