import type { LayoutLoad } from './$types';

export const load: LayoutLoad = (event) => {
  return {
    id: event.params.id,
  };
};
