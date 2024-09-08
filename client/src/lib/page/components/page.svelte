<script lang="ts">
  import type { PageModel } from '../models/page.svelte';
  import BlockReference from './blocks/reference/reference.svelte';
  import Selection from './selection/selection.svelte';
  import Tree from './tree/tree.svelte';

  let { page }: { page: PageModel } = $props();
  let reference = $derived(page.block);
  let isEditable = $derived(page.isEditable);
</script>

<div class="page">
  {#if isEditable}
    <div class="sidebar">
      <Tree {page} />
    </div>
  {/if}
  <div class="content">
    <BlockReference {reference} {isEditable} />
  </div>
  {#if isEditable}
    <div class="sidebar">
      <Selection {page} />
    </div>
  {/if}
</div>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: row;
    > .sidebar {
      display: flex;
      flex-direction: column;
    }
    > .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>
