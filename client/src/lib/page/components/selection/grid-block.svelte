<script lang="ts">
  import IdRow from '$lib/dark/inspector/row/id-row.svelte';
  import ValuesWithUnitRow from '$lib/dark/inspector/row/values-with-unit-row/values-with-unit-row.svelte';
  import Section from '$lib/dark/inspector/section.svelte';
  import type { GridBlockModel } from '$lib/page/models/blocks/block/block.svelte';

  let { model }: { model: GridBlockModel } = $props();

  let columns = $derived(model.columns);
  let rows = $derived(model.rows);
</script>

<Section>
  <IdRow value={model.id} />
  <ValuesWithUnitRow label="Columns" values={columns} />
  <ValuesWithUnitRow label="Rows" values={rows} />
</Section>
