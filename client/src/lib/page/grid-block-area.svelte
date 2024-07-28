<script lang="ts">
  import type { GridBlockAreaDefinition } from '$lib/types';
    import { gridBlockAreaPlacementDefinitionToStyleValue } from '$lib/utils/definition';
  import Block from './block.svelte';

  let { area }: { area: GridBlockAreaDefinition } = $props();

  let placement = $derived(gridBlockAreaPlacementDefinitionToStyleValue(area.placement));
</script>

<div class="area" style:--placement={placement}>
  <Block block={area.block} />
</div>

<style lang="scss">
  .area {
    grid-area: var(--placement);
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
