<script lang="ts">
  import { getSiteDefinition } from '$dummy/lib/definition/definition.svelte';
  import type { PageDefinitionModel } from '$dummy/lib/definition/pages.svelte';
  import { optionalTransform, type Property } from '$dummy/lib/utils/property.svelte';
  import DropdownRow from './dropdown-row.svelte';

  let {
    label,
    property: _property,
  }: {
    label: string;
    property: Property<string | undefined>;
  } = $props();

  let site = getSiteDefinition();
  let items = $derived(site.pages.definitions);

  let property = $derived.by(() => {
    return optionalTransform<string, PageDefinitionModel>(_property, {
      toSource: (value) => value.id,
      toTarget: (value) => items.find((item) => item.id === value),
    });
  });
</script>

{#snippet item(value: PageDefinitionModel)}
  {value.name}
{/snippet}

<DropdownRow {label} {property} {items} {item} placeholder="Page not selected" />
