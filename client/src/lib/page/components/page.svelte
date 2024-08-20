<script lang="ts">
  import type { PageModel } from '../models/page.svelte';
  import Selection from '../selection/selection.svelte';
  import BlockReference from './blocks/reference.svelte';
  import Tree from './tree/tree.svelte';

  let { page }: { page: PageModel } = $props();
  let reference = $derived(page.block);
</script>

<div class="page">
  <div class="sidebar">
    <Tree />
  </div>
  <div class="content">
    <BlockReference {reference} />
  </div>
  <div class="sidebar">
    <Selection />
  </div>
</div>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 10px;
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
