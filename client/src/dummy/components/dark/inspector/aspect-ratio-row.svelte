<script lang="ts">
  import { aspectRatioLabels, aspectRatios, type AspectRatio } from '$dummy/lib/utils/aspect-ratio';
  import { toOptional } from '$dummy/lib/utils/property-wrappers';
  import type { Property } from '$dummy/lib/utils/property.svelte';
  import DropdownRow from './dropdown-row.svelte';

  let {
    label,
    property,
  }: {
    label: string;
    property: Property<AspectRatio>;
  } = $props();

  let items = aspectRatios;
  let labels = aspectRatioLabels;
</script>

<DropdownRow {label} property={toOptional(property, '1x1')} {items} {labels} />
