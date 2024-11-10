<script lang="ts">
  import { getSiteDefinition } from '$dummy/lib/definition/definition.svelte';
  import type { LayoutDefinitionModel } from '$dummy/lib/definition/layouts.svelte';
  import type { Property } from '$dummy/lib/utils/property.svelte';
  import Dropdown from '../dropdown/dropdown.svelte';
  import Item from '../dropdown/item.svelte';
  import Column from './column.svelte';
  import Row from './row.svelte';

  let {
    label,
    property,
  }: {
    label: string;
    property: Property<string | undefined>;
  } = $props();

  let site = getSiteDefinition();

  let items = $derived(site.layouts.definitions);
  let selected = $derived(items.find((definition) => definition.id === property.value));
  let onSelect = (layout?: LayoutDefinitionModel) => property.update(layout?.id);
</script>

{#snippet item(layout?: LayoutDefinitionModel, isSelected?: boolean)}
  <Item {isSelected}>
    {#if layout}
      {layout.name}
    {:else}
      Layout not selected
    {/if}
  </Item>
{/snippet}

<Row>
  <Column {label} flex={true}>
    <Dropdown {selected} {items} {onSelect} {item} />
  </Column>
</Row>
