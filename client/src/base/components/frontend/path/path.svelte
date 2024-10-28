<script lang="ts">
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte';
  import { getter } from '$base/lib/utils/options';
  import Page from '../page.svelte';
  import Placeholder from '../placeholder.svelte';
  import { createPathContext } from './context.svelte';

  let { path }: { path: string } = $props();

  let context = createPathContext({
    path: getter(() => path),
  });

  const model = $derived(context.model);
  $effect(() => subscribe(model));

  let isLoaded = $derived(model.isLoaded);
  let page = $derived(model.page);
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

<style lang="scss">
  .path {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
