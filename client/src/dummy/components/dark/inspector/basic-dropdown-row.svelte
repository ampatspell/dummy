<script lang="ts" generics="T">
  import type { Property } from '$dummy/lib/utils/property.svelte';
  import type { Snippet } from 'svelte';
  import DropdownRow from './dropdown-row.svelte';

  let {
    label,
    property,
    items,
    item,
  }: {
    label: string;
    property: Property<T | undefined>;
    items: readonly T[];
    toString: (value: T) => string;
    item: Snippet<[value: T]>;
  } = $props();
</script>

<DropdownRow {label} {items} {property} {item} />
