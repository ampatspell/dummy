import { GalleriesModel } from '$dummy/lib/assets/galleries.svelte';
import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const id = event.params.id;
  const galleries = GalleriesModel.build();
  return {
    id,
    galleries: await preloadModel(galleries),
  };
};
