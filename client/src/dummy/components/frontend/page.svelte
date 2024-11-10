<script lang="ts">
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import Dark from '../dark/dark.svelte';
  import Placeholder from '../dark/placeholder.svelte';
  import LucideNotebookText from '../icons/lucide--notebook-text.svelte';

  let { page }: { page: PageModel } = $props();
  let definition = $derived(page.definition);
  let Component = $derived(definition?.page.frontend);
</script>

<svelte:head>
  {#if page.isLoaded && page.exists}
    <title>{page.name}</title>
  {/if}
</svelte:head>

{#snippet placeholder(label: string)}
  <Dark>
    <Placeholder icon={LucideNotebookText} {label} />
  </Dark>
{/snippet}

<div class="page">
  {#if page.isLoaded}
    {#if page.exists}
      {#if definition}
        <Component {page} />
      {:else}
        {@render placeholder('Page definition is missing')}
      {/if}
    {:else}
      {@render placeholder('Page not found')}
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
