import { preloadModel } from '$dummy/lib/firebase/fire/preload.svelte';
import { parsePath } from '$dummy/lib/pages/path.svelte';
import { PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const path = parsePath(event.params.path);
  const { layout } = await event.parent();
  const runtime = new PageRuntimeModel({
    path,
    layout,
  });
  return {
    runtime: await preloadModel(runtime),
  };
};
