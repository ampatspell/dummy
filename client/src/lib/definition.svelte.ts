import { buildSiteDefinition } from '$dummy/lib/definition/site.svelte';
import DummyLayoutFrontend from '$lib/layouts/dummy/frontend.svelte';
import DummyLayoutBackend from '$lib/layouts/dummy/backend.svelte';
import { DummyLayoutSettingsModel } from '$lib/layouts/dummy/settings.svelte';
import HelloFrontend from './pages/hello/frontend/frontend.svelte';
import HelloBackend from './pages/hello/backend/backend.svelte';
import HelloLayoutBackend from './pages/hello/layout/backend.svelte';
import { HelloPageSettingsModel } from './pages/hello/backend/settings.svelte';
import { HelloPageLayoutSettingsModel } from './pages/hello/layout/settings.svelte';
import IndexFrontend from './pages/index/frontend.svelte';
import IndexBackend from './pages/index/backend.svelte';
import { IndexPageSettingsModel } from './pages/index/settings.svelte';
import Frontend from './pages/gallery/frontend.svelte';
import Backend from './pages/gallery/backend.svelte';
import { GalleryPageSettingsModel } from './pages/gallery/settings.svelte';

export const definition = buildSiteDefinition(({ layout, page }) => {
  layout({
    id: 'dummy',
    name: 'Dummy',
    frontend: DummyLayoutFrontend,
    backend: DummyLayoutBackend,
    settings: (layout) => new DummyLayoutSettingsModel({ layout }),
    defaults: {
      title: 'dummy says hi',
    },
  });

  //

  page({
    id: 'index',
    name: 'Index',
    page: {
      frontend: IndexFrontend,
      backend: IndexBackend,
      settings: (page) => new IndexPageSettingsModel({ page }),
      defaults: {},
    },
  });

  page({
    id: 'gallery',
    name: 'Gallery',
    page: {
      frontend: Frontend,
      backend: Backend,
      settings: (page) => new GalleryPageSettingsModel({ page }),
      defaults: {
        title: 'Untitled gallery',
      },
    },
  });

  page({
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
  });
});
