<script lang="ts">
  import type { PageModel } from '$base/lib/pages/page.svelte';

  let { page }: { page: PageModel } = $props();
  let definition = $derived(page.definition);
  let Component = $derived(definition?.frontend);
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
        <div class="placeholder">
          Definition missing for page "{page.id}"
        </div>
      {/if}
    {:else}
      <div class="placeholder">
        Page "{page.id}" not found
      </div>
    {/if}
  {/if}
</div>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .placeholder {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
</style>
