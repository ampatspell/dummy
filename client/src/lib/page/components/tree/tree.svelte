<script lang="ts">
  import Dark from '$lib/dark/dark.svelte';
  import Sidebar from '$lib/dark/sidebar.svelte';
  import Tree from '$lib/dark/tree/tree.svelte';
  import { maybeBlockFromReference, type BlockReference } from '$lib/page/models/blocks/block/reference.svelte';
  import type { PageModel } from '$lib/page/models/page.svelte';
  import Block from './block.svelte';

  let { page }: { page: PageModel } = $props();

  let blocks = $derived(page.blocks);
  let block = $derived(page.block);
  let selected = $derived(blocks.selected);

  let isSelected = (ref: BlockReference) => {
    let block = maybeBlockFromReference(ref);
    return block === selected;
  };

  let onSelect = (ref?: BlockReference) => {
    blocks.select(maybeBlockFromReference(ref));
  };
</script>

<Dark>
  <Sidebar position="left" width={200}>
    <Tree {isSelected} {onSelect}>
      <Block reference={block} level={0} />
    </Tree>
  </Sidebar>
</Dark>
