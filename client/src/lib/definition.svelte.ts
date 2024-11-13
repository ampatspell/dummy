import { buildSiteDefinition } from '$dummy/lib/definition/site.svelte';
import { gallery } from './pages/gallery/definition.svelte';
import { hello } from './pages/hello/definition.svelte';
import { index } from './pages/index/definition.svelte';
import { dummy } from './layouts/dummy/definition.svelte';

export const definition = buildSiteDefinition(({ layout, page }) => {
  layout(
    dummy({
      id: 'dummy',
      name: 'Dummy',
    }),
  );

  page(
    index({
      id: 'index',
      name: 'Index',
    }),
  );

  page(
    gallery({
      id: 'gallery',
      name: 'Gallery',
    }),
  );

  page(
    hello({
      id: 'hello',
      name: 'Hello',
    }),
  );
});
