<script lang="ts">
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import Placeholder from './placeholder.svelte';

  let { page }: { page: PageModel } = $props();
  let definition = $derived(page.definition);
  let Component = $derived(definition?.page.frontend);
</script>

<svelte:head>
  {#if page.isLoaded && page.exists}
    <title>{page.name}</title>
  {/if}
</svelte:head>

<div class="page">
  {#if page.isLoaded}
    {#if page.exists}
      {#if definition}
        <Component {page} />
      {:else}
        <Placeholder message="Page definition is missing" />
      {/if}
    {:else}
      <Placeholder message="Page not found" />
    {/if}
  {/if}
</div>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
