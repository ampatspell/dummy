import { getSession } from '$dummy/lib/session/session.svelte';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
  const next = event.url.searchParams.get('next') || undefined;
  const session = getSession();
  if (session.user) {
    return redirect(307, next ?? '/backend');
  }
  return {
    next,
  };
};
