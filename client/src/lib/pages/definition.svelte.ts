import type { SiteDefinitionModelOptions } from '$dummy/lib/definition/site.svelte';
import DummyLayout from '$lib/layouts/dummy/frontend.svelte';
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
          frontend: DummyLayout,
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
