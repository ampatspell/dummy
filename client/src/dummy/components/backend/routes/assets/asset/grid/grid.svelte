<script lang="ts">
  import Placeholder from '$dummy/components/dark/section/placeholder.svelte';
  import Grid from '$dummy/components/dark/grid/grid.svelte';
  import File from './file.svelte';
  import type { FolderModel } from '$dummy/lib/assets/folder.svelte';
  import type { FileModel } from '$dummy/lib/assets/file.svelte';

  let {
    folder,
    isEditing = true,
  }: {
    folder: FolderModel;
    isEditing?: boolean;
  } = $props();

  let models = $derived(folder.images);
  let selected = $derived(folder.runtime.selected);
  let onSelect = (models: FileModel[]) => folder.runtime.select(models);
  let onReorder = (models: FileModel[]) => folder.reorder(models);
</script>

{#if folder.exists}
  <Grid {models} {selected} {isEditing} {onSelect} {onReorder}>
    {#snippet item(image)}
      <File file={image} />
    {/snippet}
    {#snippet placeholder()}
      <Placeholder label="No files uploaded yet" />
    {/snippet}
  </Grid>
{:else}
  <Placeholder label="Folder not found" />
{/if}
