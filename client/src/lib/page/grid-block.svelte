<script lang="ts">
  import type { GridBlockDefinition } from '$lib/types';
  import { gapDefinitionToStyleValue, gridBlockTrackDefinitionToStyleValue } from '$lib/utils/definition';
  import GridBlockArea from './grid-block-area.svelte';

  let { block }: { block: GridBlockDefinition } = $props();

  let columns = $derived(gridBlockTrackDefinitionToStyleValue(block.columns));
  let rows = $derived(gridBlockTrackDefinitionToStyleValue(block.rows));
  let gap = $derived(gapDefinitionToStyleValue(block.gap));
</script>

<div class="grid-block" style:--columns={columns} style:--rows={rows} style:--gap={gap}>
  {#each block.areas as area}
    <GridBlockArea {area} />
  {/each}
</div>

<style lang="scss">
  .grid-block {
    display: grid;
    grid-template-columns: var(--columns);
    grid-template-rows: var(--rows);
    gap: var(--gap);
  }
</style>
