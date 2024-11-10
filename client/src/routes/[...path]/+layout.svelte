<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { buildSiteModel } from '$dummy/lib/site/site.svelte';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import Layout from '$dummy/components/frontend/layout/layout.svelte';
  import { createPageRuntimeContext, LayoutRuntimeModel, PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';
  import { getter } from '$dummy/lib/utils/options';
  import { parsePath, type PathWithArgs } from '$dummy/lib/pages/path.svelte';

  let {
    children,
    data,
  }: {
    children: Snippet;
    data: LayoutData;
  } = $props();

  let path = $state<PathWithArgs>();

  $effect.pre(() => {
    let next = parsePath(data.path);
    if (!path) {
      path = next;
    } else {
      path.path = next.path;
      path.args = next.args;
    }
  });

  let site = buildSiteModel();

  let layout = new LayoutRuntimeModel({
    site: getter(() => site),
  });

  let runtime = new PageRuntimeModel({
    path: getter(() => path),
    layout: getter(() => layout),
  });

  createPageRuntimeContext(runtime);

  $effect(() => subscribe(site));
  $effect(() => subscribe(layout));
  $effect(() => subscribe(runtime));
</script>

<Layout {runtime}>
  {@render children()}
</Layout>
