<script lang="ts">
  import type { GridBlockModel } from '$lib/page/models/blocks/block/block.svelte';
  import { valuesWithUnitDefinitionToStyleValue } from '$lib/utils/data';
  import Area from './area.svelte';

  let { block }: { block: GridBlockModel } = $props();

  let columns = $derived(valuesWithUnitDefinitionToStyleValue(block.columns));
  let rows = $derived(valuesWithUnitDefinitionToStyleValue(block.rows));
  let areas = $derived(block.areas);
</script>

<div class="grid-block" style:--columns={columns} style:--rows={rows}>
  {#each areas as area}
    <Area {area} />
  {/each}
</div>

<style lang="scss">
  .grid-block {
    flex: 1;
    display: grid;
    grid-template-columns: var(--columns);
    grid-template-rows: var(--rows);
    gap: var(--gap);
  }
</style>
