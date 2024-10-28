import { getSession } from '$dummy/lib/session/session.svelte';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const session = await getSession().ready();
  if (!session.user && event.route.id !== '/backend/sign-in') {
    const next = event.url.pathname;
    return redirect(307, `/backend/sign-in?next=${next}`);
  }

  const route = event.route.id;
  return {
    route,
  };
};
