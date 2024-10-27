<script lang="ts">
  import type { GalleriesModel } from '$base/lib/galleries/galleries.svelte';
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';
  import type { Property } from '$base/lib/utils/property.svelte';
  import Dropdown from '../dropdown/dropdown.svelte';
  import Item from '../dropdown/item.svelte';
  import Column from './column.svelte';
  import Row from './row.svelte';

  let {
    label,
    property,
    galleries,
  }: { label: string; property: Property<string | undefined>; galleries: GalleriesModel } = $props();

  let selected = $derived(galleries.all.find((gallery) => gallery.id === property.value));
  let items = $derived(galleries.all);
  let onSelect = (gallery?: GalleryModel) => property.update(gallery?.id);
</script>

{#snippet item(gallery?: GalleryModel, isSelected?: boolean)}
  <Item {isSelected}>
    {#if gallery}
      {gallery.name}
    {:else}
      Gallery not selected
    {/if}
  </Item>
{/snippet}

{#if galleries.isLoaded}
  <Row>
    <Column {label} flex={true}>
      <Dropdown {selected} {items} {onSelect} {item} />
    </Column>
  </Row>
{/if}
