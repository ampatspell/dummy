<script lang="ts" generics="T extends string">
  import type { Property } from '$dummy/lib/utils/property.svelte';
  import Dropdown from '../dropdown/dropdown.svelte';
  import Item from '../dropdown/item.svelte';
  import Column from './column.svelte';
  import Row from './row.svelte';

  let {
    label,
    property,
    items,
    labels,
  }: {
    label: string;
    property: Property<T | undefined>;
    items: readonly T[];
    labels?: { [key in T]: string };
  } = $props();

  let selected = $derived(property.value);

  let onSelect = (value: T | undefined) => {
    if (value !== undefined) {
      property.update(value);
    }
  };
</script>

{#snippet item(value?: T, isSelected?: boolean)}
  <Item {isSelected}>
    {#if value}
      {labels?.[value] ?? value}
    {:else}
      Not selected
    {/if}
  </Item>
{/snippet}

<Row>
  <Column {label} flex={true}>
    <Dropdown {selected} {items} {onSelect} {item} />
  </Column>
</Row>
