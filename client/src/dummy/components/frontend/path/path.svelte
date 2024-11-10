<script lang="ts">
  import Dark from '$dummy/components/dark/dark.svelte';
  import Placeholder from '$dummy/components/dark/placeholder.svelte';
  import LucideNotebookText from '$dummy/components/icons/lucide--notebook-text.svelte';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import type { PathWithArgs } from '$dummy/lib/pages/path.svelte';
  import { getter } from '$dummy/lib/utils/options';
  import Page from '../page.svelte';
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
    {#if page?.exists}
      <Page {page} />
    {:else}
      <Dark>
        <Placeholder icon={LucideNotebookText} label="Page not found" />
      </Dark>
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
