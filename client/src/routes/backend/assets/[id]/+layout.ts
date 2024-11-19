import { FolderModel } from '$dummy/lib/assets/folder.svelte';
import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const folder = FolderModel.buildById(event.params.id);
  return {
    folder: await preloadModel(folder),
  };
};
