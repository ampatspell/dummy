import type { PageDefinitionModelOptions } from '$dummy/lib/definition/pages.svelte';
import PageBackend from './backend.svelte';
import PageFrontend from './frontend.svelte';
import LayoutBackend from './layout/backend.svelte';
import { GalleryPageLayoutSettingsModel, GalleryPageSettingsModel, type GalleryPageSettings } from './settings.svelte';

type Definition = PageDefinitionModelOptions<GalleryPageSettings>;

export const gallery = (opts: Pick<Definition, 'id' | 'name'>): Definition => {
  return {
    ...opts,
    page: {
      frontend: PageFrontend,
      backend: PageBackend,
      settings: (page) => new GalleryPageSettingsModel({ page }),
      defaults: {
        title: 'Untitled gallery',
      },
    },
    layout: {
      backend: LayoutBackend,
      settings: (page) => new GalleryPageLayoutSettingsModel({ page }),
    },
  };
};
