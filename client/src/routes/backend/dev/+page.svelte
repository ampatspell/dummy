<script lang="ts">
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import { buildGalleryByIdModel } from '$dummy/lib/galleries/gallery.svelte';
  import { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import Grid from './impl/grid.svelte';

  let gallery = buildGalleryByIdModel({ id: 'nyDeUmhejzHBhe5HPHuk' });
  $effect(() => subscribe(gallery));

  let isLoaded = $derived(gallery.isLoaded);

  let models = $derived(gallery.images);
  let selected = $state<GalleryImageModel[]>([]);
  let onSelect = (models: GalleryImageModel[]) => (selected = models);
  let onReorder = (models: GalleryImageModel[]) => gallery.reorder(models);
</script>

<div class="page">
  {#if isLoaded}
    <Grid {models} {selected} {onSelect} {onReorder}>
      {#snippet item(model)}
        <div class="item">
          {model.name}
        </div>
      {/snippet}
    </Grid>
  {/if}
</div>

<style lang="scss">
  .page {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  .item {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>
