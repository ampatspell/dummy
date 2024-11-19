<script lang="ts">
  import Overflow from '$dummy/components/dark/overflow.svelte';
  import type { FolderModel } from '$dummy/lib/assets/gallery.svelte';
  import Grid from './grid/grid.svelte';

  let { gallery }: { gallery: FolderModel } = $props();
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
