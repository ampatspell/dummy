import type { LayoutDefinitionModelOptions } from '$dummy/lib/definition/layouts.svelte';
import Backend from './backend.svelte';
import Frontend from './frontend.svelte';
import { DummyLayoutSettingsModel, type DummyLayoutSettings } from './settings.svelte';

type Definition = LayoutDefinitionModelOptions<DummyLayoutSettings>;

export const dummy = (opts: Pick<Definition, 'id' | 'name'>): Definition => {
  return {
    ...opts,
    frontend: Frontend,
    backend: Backend,
    settings: (layout) => new DummyLayoutSettingsModel({ layout }),
    defaults: {
      title: 'dummy says hi',
      pages: [],
    },
  };
};
