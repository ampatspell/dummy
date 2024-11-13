<script lang="ts">
  import { aspectRatioLabels, aspectRatios, type AspectRatio } from '$dummy/lib/utils/aspect-ratio';
  import type { Property } from '$dummy/lib/utils/property.svelte';
  import DropdownRow from './dropdown-row.svelte';

  let {
    label,
    property,
  }: {
    label: string;
    property: Property<AspectRatio | undefined>;
  } = $props();

  let items = aspectRatios;
  let labels = aspectRatioLabels;
</script>

<DropdownRow {label} {property} {items} {labels} />
