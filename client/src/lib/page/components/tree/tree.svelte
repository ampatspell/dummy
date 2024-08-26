<script lang="ts">
  import Dark from '$lib/dark/dark.svelte';
  import Sidebar from '$lib/dark/sidebar.svelte';
  import Tree from '$lib/dark/tree/tree.svelte';
  import { BlockModel } from '$lib/page/models/blocks/block/block.svelte';
  import type { PageModel } from '$lib/page/models/page.svelte';

  let { page }: { page: PageModel } = $props();

  let blocks = $derived(page.blocks);

  let onSelect = (block?: BlockModel) => {
    blocks.select(block);
  };
</script>

<Dark>
  <Sidebar position="left" width={200}>
    <Tree models={blocks.all} selected={blocks.selected} {onSelect}>
      {#snippet item(model: BlockModel)}
        <div class="item">
          <div class="type">{model.info.type}</div>
          <div class="description">{model.info.description || 'No description'}</div>
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
