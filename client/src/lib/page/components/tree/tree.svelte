<script lang="ts">
  import Dark from '$lib/dark/dark.svelte';
  import Sidebar from '$lib/dark/sidebar.svelte';
  import Tree from '$lib/dark/tree/tree.svelte';
  import { BlockModel } from '$lib/page/models/blocks/block/block.svelte';
  import type { PageModel } from '$lib/page/models/page.svelte';

  let { page }: { page: PageModel } = $props();
</script>

<Dark>
  <Sidebar position="left" width={200}>
    <Tree models={page.blocks.all} selected={page.blocks._selected.content}>
      {#snippet item(model: BlockModel)}
        <div class="item">
          <div class="type">{model.type}</div>
          <div class="description">{model.shortDescription || '—'}</div>
        </div>
      {/snippet}
    </Tree>
  </Sidebar>
</Dark>

<style lang="scss">
  .item {
    display: flex;
    flex-direction: column;
    gap: 3px;
    > .type {
      font-weight: 600;
    }
    > .description {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
