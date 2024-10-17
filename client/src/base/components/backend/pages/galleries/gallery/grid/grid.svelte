<script lang="ts">
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';

  let { gallery }: { gallery: GalleryModel } = $props();
</script>

<div class="grid">
  {#each gallery.images as image}
    <div class="image">
      <!-- svelte-ignore a11y_missing_attribute -->
      <img src={image.data?.sizes['120x120'].url} />
    </div>
  {/each}
</div>

<style lang="scss">
  .grid {
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
    > .image {
      width: 120px;
      height: 120px;
      padding: 0px;
      border: 1px solid var(--dark-border-color-1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
</style>
