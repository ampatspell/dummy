<script lang="ts">
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import type { LayoutModel } from '$dummy/lib/layouts/layout.svelte';
  import Layouts from '$dummy/components/backend/routes/layouts/layouts.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let id = $derived(data.id);
  let site = $derived(data.site);
  $effect(() => subscribe(site));

  let layouts = $derived(data.layouts);
  $effect(() => subscribe(layouts));

  let route = (layout: LayoutModel) => `/backend/layouts/${layout.id}`;
</script>

<Layouts {id} {layouts} {route}>
  {@render children()}
</Layouts>
