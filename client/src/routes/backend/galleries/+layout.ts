import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import { GalleriesModel } from '$dummy/lib/galleries/galleries.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const id = event.params.id;
  const galleries = new GalleriesModel({});
  return {
    id,
    galleries: await preloadModel(galleries),
  };
};
