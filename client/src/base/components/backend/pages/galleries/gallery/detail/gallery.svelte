<script lang="ts">
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';

  let { gallery }: { gallery: GalleryModel } = $props();
</script>

<div class="gallery">
  {gallery}
</div>

<style lang="scss">
  .gallery {
  }
</style>
