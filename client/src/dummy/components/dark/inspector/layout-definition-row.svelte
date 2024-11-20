<script lang="ts">
  import { getSiteDefinition } from '$dummy/lib/definition/definition.svelte';
  import type { LayoutDefinitionModel } from '$dummy/lib/definition/layouts.svelte';
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

  let items = $derived(site.layouts.definitions);
  let placeholder = 'Layout not selected';
  let property = optionalTransform<string, LayoutDefinitionModel>(_property, {
    toSource: (value) => value.id,
    toTarget: (value) => items.find((item) => item.id === value),
  });
</script>

{#snippet item(value: LayoutDefinitionModel)}
  {value.name}
{/snippet}

<DropdownRow {label} {property} {items} {item} {placeholder} />
