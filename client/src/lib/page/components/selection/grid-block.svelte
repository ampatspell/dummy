<script lang="ts">
  import IdRow from '$lib/dark/inspector/row/id-row.svelte';
  import ValueRow from '$lib/dark/inspector/row/value-row.svelte';
  import Section from '$lib/dark/inspector/section.svelte';
  import type { GridBlockModel } from '$lib/page/models/blocks/block/block.svelte';
  import { valueWithUnitToStyleValue } from '$lib/utils/data';
  import type { ValueWithUnit } from '$lib/utils/types';

  let { model }: { model: GridBlockModel } = $props();

  let toString = (values: ValueWithUnit[]) => values.map((value) => valueWithUnitToStyleValue(value)).join(', ');
  let columns = $derived(toString(model.columns));
  let rows = $derived(toString(model.rows));
</script>

<Section>
  <IdRow value={model.id} />
  <ValueRow label="Columns" value={columns} />
  <ValueRow label="Rows" value={rows} />
</Section>
