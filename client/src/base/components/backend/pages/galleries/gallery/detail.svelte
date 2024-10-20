<script lang="ts">
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';

  let { gallery }: { gallery: GalleryModel } = $props();
</script>

<div class="detail">{gallery.runtime.selected}</div>

<style lang="scss">
  .detail {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
