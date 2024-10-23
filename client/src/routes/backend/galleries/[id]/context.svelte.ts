import { buildGalleryByIdModel } from '$base/lib/galleries/gallery.svelte';
import { createContext } from '$base/lib/utils/context';
import { options, type OptionsInput } from '$base/lib/utils/options';

export type GalleryContextOptions = {
  id: string;
};

export class GalleryContext {
  private readonly options: GalleryContextOptions;
  constructor(opts: OptionsInput<GalleryContextOptions>) {
    this.options = options(opts);
  }

  readonly id = $derived.by(() => this.options.id);

  readonly gallery = $derived.by(() =>
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
