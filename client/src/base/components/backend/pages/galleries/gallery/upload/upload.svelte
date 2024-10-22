<script lang="ts">
  import Files from '$base/components/backend/files.svelte';
  import Page from '$base/components/backend/page/page.svelte';
  import Row from '$base/components/backend/page/table/row.svelte';
  import Table from '$base/components/backend/page/table/table.svelte';
  import Button from '$base/components/dark/button.svelte';
  import LucideImages from '$base/components/icons/lucide--images.svelte';
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';
  import { formatBytes } from '$base/lib/utils/number';

  let { gallery }: { gallery: GalleryModel } = $props();

  let upload = gallery.upload();

  let files = $derived(upload.primitive);
  let onFiles = (files: File[]) => upload.onFiles(files);
  let onUpload = () => upload.onUpload();
  let isDisabled = $derived(upload.isBusy);
  let isUploadDisabled = $derived(isDisabled || files.length === 0);
</script>

<Page title="Upload files" icon={LucideImages}>
  <Table>
    {#if upload.isBusy}
      <Row>
        Uploading {formatBytes(upload.total)}… {upload.progress}%
      </Row>
    {:else}
      <Row>
        <div class="actions">
          <Files {isDisabled} {onFiles} {files} />
          <Button label="Upload" isDisabled={isUploadDisabled} onClick={onUpload} />
        </div>
      </Row>
    {/if}
    {#each upload.files as file}
      <Row>
        {file.status}
        {file.progress}%
        {file.name}
        ({file.contentType}, {formatBytes(file.size)})
      </Row>
    {/each}
  </Table>
</Page>

<style lang="scss">
  .actions {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
</style>
