import { createPageDefinitions } from '$base/lib/pages/definition/definition.svelte';
import Hello from './hello.svelte';

export const createThemePageDefinitions = () => {
  createPageDefinitions({
    pages: [
      {
        id: 'hello',
        name: 'Hello',
        component: Hello,
      },
    ],
  });
};
