<script lang="ts">
  import type {
    BlockModel,
    GridBlockModel,
    PlaceholderBlockModel,
    TextBlockModel,
  } from '$lib/page/models/blocks/block/block.svelte';
  import Grid from './grid/grid.svelte';
  import Placeholder from './placeholder.svelte';
  import Text from './text.svelte';

  let { block }: { block: BlockModel } = $props();
  let isEditable = $derived(block.isEditable);
  let isEditing = $derived(block.isEditing);
  let isSelected = $derived(block.isSelected);

  let onclick = (e: Event) => {
    e.stopPropagation();
    if (isEditable) {
      if (isSelected) {
        block.edit();
      } else {
        block.select();
      }
    }
  };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="block" class:selected={isSelected} class:editing={isEditing} {onclick}>
  {#if block.type === 'text'}
    <Text block={block as TextBlockModel} />
  {:else if block.type === 'grid'}
    <Grid block={block as GridBlockModel} />
  {:else if block.type === 'placeholder'}
    <Placeholder block={block as PlaceholderBlockModel} />
  {:else}
    <div class="placeholder">Unknown block '{block.type}'</div>
  {/if}
</div>

<style lang="scss">
  .block {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    outline-offset: -2px;
    &.selected {
      outline: 1px solid fade-out(green, 0.5);
    }
    &.editing {
      outline: 1px solid fade-out(red, 0.5);
    }
  }
</style>
