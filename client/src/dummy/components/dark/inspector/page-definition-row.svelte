<script lang="ts">
  import { getSiteDefinition } from '$dummy/lib/definition/definition.svelte';
  import type { PageDefinitionModel } from '$dummy/lib/definition/pages.svelte';
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

  let items = $derived(site.pages.definitions);
  let selected = $derived(items.find((definition) => definition.id === property.value));
  let onSelect = (page?: PageDefinitionModel) => property.update(page?.id);
</script>

{#snippet item(page?: PageDefinitionModel, isSelected?: boolean)}
  <Item {isSelected}>
    {#if page}
      {page.name}
    {:else}
      Page not selected
    {/if}
  </Item>
{/snippet}

<Row>
  <Column {label} flex={true}>
    <Dropdown {selected} {items} {onSelect} {item} />
  </Column>
</Row>
