<script lang="ts">
  import type { GalleryImageModel } from '$base/lib/galleries/image.svelte';

  let { image, size }: { image: GalleryImageModel; size: number } = $props();
</script>

<div class="image" style:--size="{size}px">
  <!-- svelte-ignore a11y_missing_attribute -->
  <img src={image.data?.sizes['120x120'].url} draggable="false" />
</div>

<style lang="scss">
  .image {
    width: var(--size);
    height: var(--size);
    border: 1px solid var(--dark-border-color-2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:hover {
      background: var(--dark-selected-background-color);
    }
  }
</style>
