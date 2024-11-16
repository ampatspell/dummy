import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import { UsersModel } from '$dummy/lib/users/users.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const users = UsersModel.build();
  const id = event.params.id;
  return {
    id,
    users: await preloadModel(users),
  };
};
