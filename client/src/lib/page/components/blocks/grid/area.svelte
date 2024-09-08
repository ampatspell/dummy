<script lang="ts">
  import type { GridAreaBlockModel } from '$lib/page/models/blocks/block/block.svelte';
  import { gridBlockAreaPlacementToStyleValue } from '$lib/utils/data';
  import BlockReference from '../reference/reference.svelte';

  let { area }: { area: GridAreaBlockModel } = $props();

  let placement = $derived(gridBlockAreaPlacementToStyleValue(area.placement));
  let reference = $derived(area.block);
  let isEditable = $derived(area.isEditable);
</script>

<div class="area" style:--placement={placement}>
  <BlockReference {reference} {isEditable} />
</div>

<style lang="scss">
  .area {
    grid-area: var(--placement);
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
