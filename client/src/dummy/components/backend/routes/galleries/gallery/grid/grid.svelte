<script lang="ts">
  import Placeholder from '$dummy/components/dark/section/placeholder.svelte';
  import type { GalleryModel } from '$dummy/lib/galleries/gallery.svelte';
  import Grid from './base/grid.svelte';
  import NewImage from './image.svelte';

  let {
    gallery,
    isEditing: _isEditing,
  }: {
    gallery: GalleryModel;
    isEditing?: boolean;
  } = $props();

  let isEditing = $derived(_isEditing ?? true);

  let onclick = () => {
    gallery.runtime.clear();
  };
</script>

{#if gallery.exists}
  {#if gallery.images.length}
    <Grid onClick={onclick}>
      {#each gallery.images as image}
        <NewImage {image} {isEditing} />
      {/each}
    </Grid>
  {:else}
    <Placeholder label="No images uploaded yet" />
  {/if}
{:else}
  <Placeholder label="Gallery not found" />
{/if}
