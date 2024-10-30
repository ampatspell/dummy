<script lang="ts">
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import type { PathWithArgs } from '$dummy/lib/pages/path.svelte';
  import { getter } from '$dummy/lib/utils/options';
  import Page from '../page.svelte';
  import Placeholder from '../placeholder.svelte';
  import Backend from './backend.svelte';
  import { createPathContext } from './context.svelte';

  let { path }: { path: PathWithArgs } = $props();

  let context = createPathContext({
    path: getter(() => path),
  });

  const model = $derived(context.model);
  $effect(() => subscribe(model));

  let isLoaded = $derived(model.isLoaded);
  let page = $derived(model.page);

  $effect(() => {
    if (page) {
      page.onPageView();
    }
  });
</script>

<div class="path">
  {#if isLoaded}
    {#if page}
      <Page {page} />
    {:else}
      <Placeholder message="Page not found" />
    {/if}
  {/if}
</div>

<Backend {model} />

<style lang="scss">
  .path {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
