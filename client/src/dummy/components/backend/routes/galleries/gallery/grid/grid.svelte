<script lang="ts">
  import Placeholder from '$dummy/components/dark/section/placeholder.svelte';
  import Grid from '$dummy/components/dark/grid/grid.svelte';
  import Image from './image.svelte';
  import type { GalleryModel } from '$dummy/lib/assets/gallery.svelte';
  import type { GalleryImageModel } from '$dummy/lib/assets/image.svelte';

  let {
    gallery,
    isEditing = true,
  }: {
    gallery: GalleryModel;
    isEditing?: boolean;
  } = $props();

  let models = $derived(gallery.images);
  let selected = $derived(gallery.runtime.selected);
  let onSelect = (models: GalleryImageModel[]) => gallery.runtime.select(models);
  let onReorder = (models: GalleryImageModel[]) => gallery.reorder(models);
</script>

{#if gallery.exists}
  <Grid {models} {selected} {isEditing} {onSelect} {onReorder}>
    {#snippet item(image)}
      <Image {image} />
    {/snippet}
    {#snippet placeholder()}
      <Placeholder label="No files uploaded yet" />
    {/snippet}
  </Grid>
{:else}
  <Placeholder label="Folder not found" />
{/if}
