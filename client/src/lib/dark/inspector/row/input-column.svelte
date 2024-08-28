<script lang="ts">
  import Input from '$lib/dark/input.svelte';
  import type { Property } from '$lib/utils/property.svelte';
  import Column from './column.svelte';

  let { label, property }: { label: string; property: Property<string | undefined> } = $props();

  let onEnter = (value: string) => property.update(value);
</script>

<Column {label}>
  <Input value={property.value} {onEnter} />
</Column>
