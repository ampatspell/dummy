<script lang="ts">
  import type { GridBlockModel } from '$lib/page/models/blocks/block/block.svelte';
  import Area from './area.svelte';

  let { block }: { block: GridBlockModel } = $props();

  let columns = $derived(block.columns.style);
  let rows = $derived(block.rows.style);
  let areas = $derived(block.areas);
</script>

<div class="grid-block">
  <div class="content" style:--columns={columns} style:--rows={rows}>
    {#each areas as area}
      <Area {area} />
    {/each}
  </div>
</div>

<style lang="scss">
  .grid-block {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .content {
      flex: 1;
      display: grid;
      grid-template-columns: var(--columns);
      grid-template-rows: var(--rows);
      gap: var(--gap);
    }
  }
</style>
