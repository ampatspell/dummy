<script lang="ts">
  import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
  import Button from '$lib/components/dark/button.svelte';
  import Dark from '$lib/components/dark/dark.svelte';
  import Item from '$lib/components/dark/tree/item.svelte';
  import Tree from '$lib/components/dark/tree/tree.svelte';
  import { getLayout } from '$lib/components/layout/models/layout.svelte';
  import type { PageModel } from '../models/page.svelte';

  let {
    page,
  }: {
    page: PageModel;
  } = $props();

  const layout = getLayout();
  const blocks = $derived(page.blocks);
  const isSelected = (model: BlockModel) => blocks.selected === model;
  const onSelect = (model?: BlockModel) => blocks.select(model);
  const onDoneEditing = () => (layout.isEditing = false);
</script>

<Dark>
  <div class="blocks">
    <div class="tree">
      <Tree {isSelected} {onSelect}>
        {#each blocks.all as model}
          <Item {model}>
            <div class="row">{model === page.block ? 'Root' : 'Nested'}</div>
            <div class="row">{model.id}</div>
          </Item>
        {/each}
      </Tree>
    </div>
    <div class="footer">
      <Button label="Done editing" onClick={onDoneEditing} />
    </div>
  </div>
</Dark>

<style lang="scss">
  .blocks {
    flex: 1;
    width: 180px;
    display: flex;
    flex-direction: column;
    > .tree {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    > .footer {
      padding: 5px;
    }
  }
</style>
