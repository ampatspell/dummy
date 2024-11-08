import type { SiteDefinitionModelOptions } from '$dummy/lib/definition/site.svelte';
import DummyLayoutFrontend from '$lib/layouts/dummy/frontend.svelte';
import DummyLayoutBackend from '$lib/layouts/dummy/backend.svelte';
import { DummyLayoutSettingsModel } from '$lib/layouts/dummy/settings.svelte';
import HelloBackend from './hello/backend/backend.svelte';
import HelloFrontend from './hello/frontend/frontend.svelte';
import { HelloPageSettingsModel } from './hello/settings.svelte';

export const siteDefinition = (): SiteDefinitionModelOptions => {
  return {
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
          backend: HelloBackend,
          settings: (page) => new HelloPageSettingsModel({ page }),
          defaults: {
            title: 'Untitled hello page',
          },
        },
      ],
    },
  };
};
