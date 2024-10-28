<script lang="ts">
  import type { GalleryModel } from '$dummy/lib/galleries/gallery.svelte';

  let { gallery, imagePadding }: { gallery: GalleryModel; imagePadding: number } = $props();
</script>

<div class="gallery" style:--image-padding="{imagePadding}px">
  {#each gallery.images as image}
    <div class="image">
      <!-- svelte-ignore a11y_missing_attribute -->
      <img src={image.thumbnails['2048x2048'].url} draggable="false" />
    </div>
  {/each}
</div>

<style lang="scss">
  .gallery {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    > .image {
      max-width: 2048px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      > img {
        display: block;
        width: calc(100% - var(--image-padding));
        height: calc(100% - var(--image-padding));
        object-fit: contain;
      }
    }
  }
</style>
