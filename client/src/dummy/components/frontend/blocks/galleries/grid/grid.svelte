<script lang="ts">
  import type { GalleryModel } from '$dummy/lib/galleries/gallery.svelte';
  import { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import Image from './image.svelte';

  let {
    gallery,
    onClick: _onClick,
  }: {
    gallery: GalleryModel;
    onClick: (image: GalleryImageModel) => void;
  } = $props();

  let onClick = (image: GalleryImageModel) => () => {
    _onClick(image);
  };
</script>

<div class="grid">
  {#each gallery.images as image}
    <Image {image} onClick={onClick(image)} />
  {/each}
</div>

<style lang="scss">
  .grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px;
  }
</style>
