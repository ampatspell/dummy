import { getSession } from '$dummy/lib/session/session.svelte';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

const signIn = '/backend/sign-in';
const forbidden = '/backend/forbidden';

export const load: LayoutLoad = async (event) => {
  const session = await getSession().ready();
  const user = session.user;

  if (!user) {
    if (event.url.pathname !== signIn) {
      const next = event.url.pathname;
      let target;
      if (next === '/backend') {
        target = signIn;
      } else {
        target = `${signIn}?next=${next}`;
      }
      return redirect(307, target);
    }
  } else if (!user.isAdmin) {
    if (event.url.pathname !== forbidden) {
      return redirect(307, forbidden);
    }
  }

  const route = event.route.id;
  return {
    route,
  };
};
