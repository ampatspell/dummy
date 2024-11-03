import { Model } from '$dummy/lib/firebase/fire/model.svelte';
import { buildGalleryByIdModel } from '$dummy/lib/galleries/gallery.svelte';
import { createContext } from '$dummy/lib/utils/context';
import { type OptionsInput } from '$dummy/lib/utils/options';

export type GalleryContextOptions = {
  id: string;
};

export class GalleryContext extends Model<GalleryContextOptions> {
  readonly id = $derived(this.options.id);

  readonly gallery = $derived(
    buildGalleryByIdModel({
      id: this.id,
    }),
  );
}

const { get: getGalleryContext, set: setGalleryContext } = createContext<GalleryContext>('layout-gallery');

export const createGalleryContext = (opts: OptionsInput<GalleryContextOptions>) => {
  return setGalleryContext(new GalleryContext(opts));
};

export { getGalleryContext };
