<script lang="ts">
  import ValueRow from '$lib/dark/inspector/row/value-row.svelte';
  import Section from '$lib/dark/inspector/section.svelte';
  import type { GridAreaBlockModel } from '$lib/page/models/blocks/block/block.svelte';
  import { gridBlockAreaPlacementToStyleValue } from '$lib/utils/data';

  let { model }: { model: GridAreaBlockModel } = $props();
</script>

<Section>
  <ValueRow label="Placement" value={gridBlockAreaPlacementToStyleValue(model.placement)} />
</Section>
