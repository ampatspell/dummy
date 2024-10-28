<script lang="ts">
  import Overflow from '$dummy/components/dark/overflow.svelte';
  import type { GalleryModel } from '$dummy/lib/galleries/gallery.svelte';
  import Grid from './grid/grid.svelte';

  let { gallery }: { gallery: GalleryModel } = $props();
</script>

<Overflow overflow="y">
  <div class="master">
    <Grid {gallery} />
  </div>
</Overflow>

<style lang="scss">
  .master {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
</style>
