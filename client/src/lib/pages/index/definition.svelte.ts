import type { PageDefinitionModelOptions } from '$dummy/lib/definition/pages.svelte';
import Backend from './backend.svelte';
import Frontend from './frontend.svelte';
import { IndexPageSettingsModel, type IndexPageSettings } from './settings.svelte';

type Definition = PageDefinitionModelOptions<IndexPageSettings>;

export const index = (opts: Pick<Definition, 'id' | 'name'>): Definition => {
  return {
    ...opts,
    page: {
      frontend: Frontend,
      backend: Backend,
      settings: (page) => new IndexPageSettingsModel({ page }),
      defaults: {},
    },
  };
};
