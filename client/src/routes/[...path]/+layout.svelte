<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { buildSiteModel } from '$dummy/lib/site/site.svelte';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import Layout from '$dummy/components/frontend/layout/layout.svelte';
  import { LayoutRuntimeModel, PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';
  import { getter } from '$dummy/lib/utils/options';

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

  let layout = new LayoutRuntimeModel({
    site: getter(() => site),
  });
  $effect(() => subscribe(layout));

  let runtime = new PageRuntimeModel({
    path: getter(() => path),
    layout: getter(() => layout),
  });
  $effect(() => subscribe(runtime));
</script>

<Layout {runtime}>
  {@render children()}
</Layout>
