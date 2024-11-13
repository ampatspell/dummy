import type { PageDefinitionModelOptions } from '$dummy/lib/definition/pages.svelte';
import PageBackend from './backend/backend.svelte';
import { HelloPageSettingsModel, type HelloPageSettings } from './backend/settings.svelte';
import PageFrontend from './frontend/frontend.svelte';
import LayoutBackend from './layout/backend.svelte';
import { HelloPageLayoutSettingsModel } from './layout/settings.svelte';

type Definition = PageDefinitionModelOptions<HelloPageSettings>;

export const hello = (opts: Pick<Definition, 'id' | 'name'>): Definition => {
  return {
    ...opts,
    page: {
      frontend: PageFrontend,
      backend: PageBackend,
      settings: (page) => new HelloPageSettingsModel({ page }),
      defaults: {
        title: 'Untitled hello page',
      },
    },
    layout: {
      backend: LayoutBackend,
      settings: (page) => new HelloPageLayoutSettingsModel({ page }),
    },
  };
};
