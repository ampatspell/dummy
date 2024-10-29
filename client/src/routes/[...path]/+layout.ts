import { parsePath } from '$dummy/lib/pages/path.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = (event) => {
  const path = event.params.path;
  return {
    path: path !== undefined ? parsePath(path) : undefined,
  };
};
