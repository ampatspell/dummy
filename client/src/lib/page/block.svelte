<script lang="ts">
  import type { BlockDefinition, GridBlockDefinition, PlaceholderBlockDefinition, TextBlockDefinition } from '$lib/types';
  import GridBlock from './grid-block.svelte';
  import PlaceholderBlock from './placeholder-block.svelte';
  import TextBlock from './text-block.svelte';

  let { block }: { block: BlockDefinition } = $props();
</script>

<div class="block">
  {#if block.type === 'text'}
    <TextBlock block={block as TextBlockDefinition} />
  {:else if block.type === 'grid'}
    <GridBlock block={block as GridBlockDefinition} />
  {:else if block.type === 'placeholder'}
    <PlaceholderBlock block={block as PlaceholderBlockDefinition} />
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
