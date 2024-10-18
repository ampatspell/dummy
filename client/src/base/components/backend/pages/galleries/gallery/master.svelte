<script lang="ts">
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';
  import Grid from './grid/grid.svelte';

  let { gallery }: { gallery: GalleryModel } = $props();
</script>

<div class="master">
  <Grid {gallery} />
</div>

<style lang="scss">
  .master {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
</style>
