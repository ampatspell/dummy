import type { LayoutLoad } from './$types';

export const load: LayoutLoad = (event) => {
  const route = event.route.id;
  return {
    route,
  };
};
