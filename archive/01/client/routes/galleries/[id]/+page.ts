import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
  let parent = await event.parent();
  const gallery = parent.gallery;
  redirect(307, `/galleries/${encodeURIComponent(gallery.id)}/vertical`);
};
