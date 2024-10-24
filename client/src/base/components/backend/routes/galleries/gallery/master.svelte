<script lang="ts">
  import Overflow from '$base/components/backend/page/overflow.svelte';
  import Dropbox from '$base/components/dark/dropbox.svelte';
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';
  import Grid from './grid/grid.svelte';

  let { gallery }: { gallery: GalleryModel } = $props();

  let onFiles = (files: File[]) => {
    let upload = gallery.upload();
    upload.onFiles(files);
    upload.onUpload();
  };
</script>

<Dropbox {onFiles}>
  <Overflow overflow="y">
    <div class="master">
      <Grid {gallery} />
    </div>
  </Overflow>
</Dropbox>

<style lang="scss">
  .master {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
</style>
