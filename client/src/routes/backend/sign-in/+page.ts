import { getSession } from '$dummy/lib/session/session.svelte';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
  const next = event.url.searchParams.get('next') || '/backend';
  const session = getSession();
  if (session.user) {
    return redirect(307, next);
  }
  return {
    next,
  };
};
