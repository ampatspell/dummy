<script lang="ts">
  import { aspectRatioLabels, aspectRatios, type AspectRatio } from '$dummy/lib/utils/aspect-ratio';
  import { toOptional, type Property } from '$dummy/lib/utils/property.svelte';
  import BasicDropdownRow from './basic-dropdown-row.svelte';

  let {
    label,
    property,
  }: {
    label: string;
    property: Property<AspectRatio>;
  } = $props();

  let items = aspectRatios;
</script>

{#snippet item(value: AspectRatio)}
  {aspectRatioLabels[value]}
{/snippet}

<BasicDropdownRow {label} property={toOptional(property, '1x1')} {items} {item} />
