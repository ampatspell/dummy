import type { SiteDefinitionModelOptions } from '$dummy/lib/definition/site.svelte';
import DummyLayoutFrontend from '$lib/layouts/dummy/frontend.svelte';
import DummyLayoutBackend from '$lib/layouts/dummy/backend.svelte';
import { DummyLayoutSettingsModel } from '$lib/layouts/dummy/settings.svelte';
import HelloBackend from './pages/hello/backend/backend.svelte';
import HelloFrontend from './pages/hello/frontend/frontend.svelte';
import { HelloPageSettingsModel } from './pages/hello/settings.svelte';

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
        frontend: HelloFrontend,
        page: {
          component: HelloBackend,
          settings: (page) => new HelloPageSettingsModel({ page }),
        },
        defaults: {
          title: 'Untitled hello page',
        },
      },
    ],
  },
};
