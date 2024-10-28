<script lang="ts">
  import type { GalleryModel } from '$dummy/lib/galleries/gallery.svelte';

  let { gallery }: { gallery: GalleryModel } = $props();
</script>

<div class="grid">
  <div class="images">
    {#each gallery.images as image}
      <div class="image">
        <!-- svelte-ignore a11y_missing_attribute -->
        <img src={image.thumbnails['120x120'].url} draggable="false" />
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .grid {
    display: flex;
    flex-direction: column;
    max-width: 1024px;
    padding-bottom: 50px;
    .images {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 20px;
      > .image {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        --size: 120px;
        width: var(--size);
        height: var(--size);
        > img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
</style>
