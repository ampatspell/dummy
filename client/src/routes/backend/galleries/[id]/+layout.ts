import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import { buildGalleryByIdModel } from '$dummy/lib/galleries/gallery.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const gallery = buildGalleryByIdModel({ id: event.params.id });
  return {
    gallery: await preloadModel(gallery),
  };
};
