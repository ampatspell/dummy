import { createPageDefinitions } from '$base/lib/pages/definition/definition.svelte';
import HelloBackend from './hello/backend.svelte';
import HelloFrontend from './hello/frontend.svelte';
import { HelloPageSettingsModel } from './hello/settings.svelte';

export type HelloPageSettings = {
  title: string;
};

export const createThemePageDefinitions = () => {
  createPageDefinitions({
    pages: [
      {
        id: 'hello',
        name: 'Hello',
        frontend: HelloFrontend,
        backend: HelloBackend,
        settings: (page) => new HelloPageSettingsModel({ page }),
        defaults: {
          title: 'Untitled hello page',
        } satisfies HelloPageSettings,
      },
    ],
  });
};
