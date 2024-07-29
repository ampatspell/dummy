<script lang="ts">
  import type { GridBlockAreaModel } from '$lib/page/models/blocks/block/block.svelte';
  import { gridBlockAreaPlacementToStyleValue } from '$lib/utils/data';
  import BlockReference from '../reference.svelte';

  let { area }: { area: GridBlockAreaModel } = $props();

  let placement = $derived(gridBlockAreaPlacementToStyleValue(area.placement));
  let reference = $derived(area.block);
</script>

<div class="area" style:--placement={placement}>
  <BlockReference {reference} />
</div>

<style lang="scss">
  .area {
    grid-area: var(--placement);
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
