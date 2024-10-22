<script lang="ts">
  import type { GalleryImageModel } from '$base/lib/galleries/image.svelte';

  let { image }: { image: GalleryImageModel } = $props();
</script>

<div class="image">
  image {image}
</div>

<style lang="scss">
  .image {
  }
</style>
