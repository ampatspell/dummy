<script lang="ts">
  import IdRow from '$lib/dark/inspector/row/id-row.svelte';
  import ValueRow from '$lib/dark/inspector/row/value-row.svelte';
  import ValuesWithUnitRow from '$lib/dark/inspector/row/values-with-unit-row.svelte';
  import Section from '$lib/dark/inspector/section.svelte';
  import type { GridBlockModel } from '$lib/page/models/blocks/block/block.svelte';

  let { model }: { model: GridBlockModel } = $props();

  let columns = $derived(model.columns.style);
  let rows = $derived(model.rows.style);
</script>

<Section>
  <IdRow value={model.id} />
  <ValuesWithUnitRow label="Columns" name="column" values={model.columns} />
  <ValuesWithUnitRow label="Rows" name="row" values={model.rows} />
</Section>
