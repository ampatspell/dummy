import type { PageDefinitionModelOptions } from '$dummy/lib/definition/pages.svelte';
import Backend from './backend.svelte';
import Frontend from './frontend.svelte';
import { GalleryPageSettingsModel, type GalleryPageSettings } from './settings.svelte';

type Definition = PageDefinitionModelOptions<GalleryPageSettings>;

export const gallery = (opts: Pick<Definition, 'id' | 'name'>): Definition => {
  return {
    ...opts,
    page: {
      frontend: Frontend,
      backend: Backend,
      settings: (page) => new GalleryPageSettingsModel({ page }),
      defaults: {
        title: 'Untitled gallery',
      },
    },
  };
};
