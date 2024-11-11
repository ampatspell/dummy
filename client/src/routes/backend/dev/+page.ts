import { buildGalleryByIdModel } from "$dummy/lib/galleries/gallery.svelte";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  const gallery = buildGalleryByIdModel({ id: 'XaiI2TDdXsoPewMT9YB2' });
  await gallery.load();
  return {
    gallery
  };
}
