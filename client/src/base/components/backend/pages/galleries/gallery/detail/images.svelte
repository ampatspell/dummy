<script lang="ts">
  import Button from '$base/components/dark/button.svelte';
  import type { GalleryImageModel } from '$base/lib/galleries/image.svelte';

  let { images }: { images: GalleryImageModel[] } = $props();

  let onDelete = async () => {
    await Promise.all(images.map((image) => image.delete()));
  };
</script>

<div class="images">
  images {images}
  <Button label="Delete all" onClick={onDelete} />
</div>

<style lang="scss">
  .images {
  }
</style>
