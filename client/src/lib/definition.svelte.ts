import type { SiteDefinitionModelOptions } from '$dummy/lib/definition/site.svelte';
import DummyLayoutFrontend from '$lib/layouts/dummy/frontend.svelte';
import DummyLayoutBackend from '$lib/layouts/dummy/backend.svelte';
import { DummyLayoutSettingsModel } from '$lib/layouts/dummy/settings.svelte';
import HelloFrontend from './pages/hello/frontend/frontend.svelte';
import HelloBackend from './pages/hello/backend/backend.svelte';
import HelloLayoutBackend from './pages/hello/layout/backend.svelte';
import { HelloPageSettingsModel } from './pages/hello/backend/settings.svelte';
import { HelloPageLayoutSettingsModel } from './pages/hello/layout/settings.svelte';

export const definition: SiteDefinitionModelOptions = {
  layouts: {
    definitions: [
      {
        id: 'dummy',
        name: 'Dummy',
        frontend: DummyLayoutFrontend,
        backend: DummyLayoutBackend,
        settings: (layout) => new DummyLayoutSettingsModel({ layout }),
        defaults: {
          title: 'Dummy says hi',
        },
      },
    ],
  },
  pages: {
    definitions: [
      {
        id: 'hello',
        name: 'Hello',
        page: {
          frontend: HelloFrontend,
          backend: HelloBackend,
          settings: (page) => new HelloPageSettingsModel({ page }),
          defaults: {
            title: 'Untitled hello page',
          },
        },
        layout: {
          backend: HelloLayoutBackend,
          settings: (page) => new HelloPageLayoutSettingsModel({ page }),
        },
      },
    ],
  },
};
