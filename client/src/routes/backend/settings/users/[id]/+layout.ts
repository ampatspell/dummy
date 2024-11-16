import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import { UserModel } from '$dummy/lib/users/user.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const id = event.params.id;
  const user = UserModel.buildById(id);
  return {
    user: await preloadModel(user),
  };
};
