import type { LayoutLoad } from './$types';

export const load: LayoutLoad = (event) => {
  const path = event.params.path;
  return {
    path,
  };
};
