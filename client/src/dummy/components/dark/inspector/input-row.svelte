<script lang="ts">
  import type { Property } from '$dummy/lib/utils/property.svelte';
  import Input from '../input.svelte';
  import Column from './column.svelte';
  import Row from './row.svelte';

  let { label, property }: { label: string; property: Property<string> } = $props();

  let value = $derived(property.value);
  let onEnter = (value: string) => property.update(value);
</script>

<Row>
  <Column {label} flex={true}>
    <Input {value} {onEnter} />
  </Column>
</Row>
