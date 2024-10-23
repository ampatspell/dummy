import type { LayoutLoad } from './$types';

export const load: LayoutLoad = (event) => {
  const id = event.params.id;
  return {
    id,
  };
};
