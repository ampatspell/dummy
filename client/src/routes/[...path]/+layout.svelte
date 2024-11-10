<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { buildSiteModel } from '$dummy/lib/site/site.svelte';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import Layout from '$dummy/components/frontend/layout/layout.svelte';

  let {
    children,
    data,
  }: {
    children: Snippet;
    data: LayoutData;
  } = $props();

  let path = $derived(data.path);

  let site = buildSiteModel();
  $effect(() => subscribe(site));
</script>

<Layout {site} {path}>
  {@render children()}
</Layout>
