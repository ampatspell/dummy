<script lang="ts">
  import type { LayoutModel } from '$dummy/lib/layouts/layout.svelte';
  import Page from './page.svelte';

  let {
    layout,
  }: {
    layout: LayoutModel;
  } = $props();

  let pages = $derived(layout.pages);
</script>

{#if pages}
  {#each pages.all as page}
    <Page {page} />
  {/each}
{/if}
