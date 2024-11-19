<script lang="ts">
  import Placeholder from '$dummy/components/dark/section/placeholder.svelte';
  import Grid from '$dummy/components/dark/grid/grid.svelte';
  import Image from './image.svelte';
  import type { FolderModel } from '$dummy/lib/assets/folder.svelte';
  import type { FileModel } from '$dummy/lib/assets/file.svelte';

  let {
    gallery,
    isEditing = true,
  }: {
    gallery: FolderModel;
    isEditing?: boolean;
  } = $props();

  let models = $derived(gallery.images);
  let selected = $derived(gallery.runtime.selected);
  let onSelect = (models: FileModel[]) => gallery.runtime.select(models);
  let onReorder = (models: FileModel[]) => gallery.reorder(models);
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
