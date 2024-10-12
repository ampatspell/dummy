<script lang="ts">
  import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
  import Dark from '$lib/components/dark/dark.svelte';
  import Item from '$lib/components/dark/tree/item.svelte';
  import Tree from '$lib/components/dark/tree/tree.svelte';
  import type { PageModel } from '../models/page.svelte';

  let {
    page,
  }: {
    page: PageModel;
  } = $props();

  const blocks = $derived(page.blocks);
  const isSelected = (model: BlockModel) => blocks.selected === model;
  const onSelect = (model?: BlockModel) => blocks.select(model);
</script>

<Dark>
  <div class="blocks">
    <Tree {isSelected} {onSelect}>
      {#each blocks.all as model}
        <Item {model}>
          <div class="row">{model === page.block ? 'Root' : 'Nested'}</div>
          <div class="row">{model.id}</div>
          <div class="row">{model.definition?.id ?? 'Invalid'}</div>
        </Item>
      {/each}
    </Tree>
  </div>
</Dark>

<style lang="scss">
  .blocks {
    flex: 1;
    width: 180px;
    display: flex;
    flex-direction: column;
  }
</style>
