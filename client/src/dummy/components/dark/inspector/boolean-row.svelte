<script lang="ts">
  import { Property, toOptional } from '$dummy/lib/utils/property.svelte';
  import BasicDropdownRow from './basic-dropdown-row.svelte';

  let {
    label,
    property,
  }: {
    label: string;
    property: Property<boolean>;
  } = $props();

  let items = [true, false];
</script>

{#snippet item(value: boolean)}
  {value ? 'Yes' : 'No'}
{/snippet}

<BasicDropdownRow {label} property={toOptional(property, false)} {items} {item} />
