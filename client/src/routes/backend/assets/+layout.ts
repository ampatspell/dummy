import { FoldersModel } from '$dummy/lib/assets/folders.svelte';
import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const id = event.params.id;
  const folders = FoldersModel.build();
  return {
    id,
    folders: await preloadModel(folders),
  };
};
