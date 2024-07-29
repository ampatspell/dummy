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
</script>

<div class="block">
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
  }
</style>
