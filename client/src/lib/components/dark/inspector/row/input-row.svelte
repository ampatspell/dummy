<script lang="ts">
  import type { Property } from '$lib/utils/property.svelte';
  import InputColumn from './column/input-column.svelte';
  import Row from './row.svelte';

  let { label, property }: { label: string; property: Property<string | undefined> } = $props();
</script>

<Row>
  <InputColumn {label} {property} />
</Row>
