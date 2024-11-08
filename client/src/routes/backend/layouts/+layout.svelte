<script lang="ts">
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { buildLayoutsModel } from '$dummy/lib/layouts/layouts.svelte';
  import type { LayoutModel } from '$dummy/lib/layouts/layout.svelte';
  import Layouts from '$dummy/components/backend/routes/layouts/layouts.svelte';
  import { createSiteContext } from './context.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let id = $derived(data.id);

  let context = createSiteContext();
  let site = $derived(context.site);
  $effect(() => subscribe(site));

  let layouts = buildLayoutsModel();
  $effect(() => subscribe(layouts));

  let route = (layout: LayoutModel) => `/backend/layouts/${layout.id}`;
</script>

<Layouts {id} {site} {layouts} {route}>
  {@render children()}
</Layouts>
