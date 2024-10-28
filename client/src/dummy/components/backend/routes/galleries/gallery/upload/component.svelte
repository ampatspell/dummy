<script lang="ts">
  import Overflow from '$dummy/components/dark/overflow.svelte';
  import Cell from '$dummy/components/dark/table/cell.svelte';
  import Table from '$dummy/components/dark/table/table.svelte';
  import Button from '$dummy/components/dark/button.svelte';
  import Files from '$dummy/components/dark/files.svelte';
  import Icon from '$dummy/components/dark/icon.svelte';
  import Actions from '$dummy/components/dark/modals/modal/actions.svelte';
  import Header from '$dummy/components/dark/modals/modal/header.svelte';
  import Modal from '$dummy/components/dark/modals/modal/modal.svelte';
  import LucideTrash_2 from '$dummy/components/icons/lucide--trash-2.svelte';
  import type { GalleryUploadFileModel } from '$dummy/lib/galleries/upload.svelte';
  import type { GalleryUploadModalProps, GalleryUploadModalResolution } from './models.svelte';
  import type { ModalRuntime } from '$dummy/components/dark/modals/base/modal.svelte';

  let { modal }: { modal: ModalRuntime<GalleryUploadModalProps, GalleryUploadModalResolution> } = $props();

  let gallery = $derived(modal.props.gallery);
  let upload = $derived(gallery.upload());

  let files = $derived(upload.primitive);
  let onFiles = async (files: File[]) => {
    upload.onFiles(files);
  };

  let onUpload = async () => {
    await modal.withBusy(async () => {
      await upload.onUpload();
    });
    modal.resolve(true);
  };

  let onCancel = () => {
    modal.resolve(false);
  };

  let isCancelDisabled = $derived(upload.isBusy);
  let isUploadDisabled = $derived(upload.isBusy || upload.files.length === 0);

  let title = $derived.by(() => {
    if (upload.isBusy) {
      return `Uploading ${upload.progress}%…`;
    }
    return 'Upload images';
  });

  let onRemove = (file: GalleryUploadFileModel) => () => {
    file.remove();
  };
</script>

<Modal size={{ width: 500, height: 400 }}>
  <Header {title} />
  <div class="content">
    {#if files.length === 0}
      <div class="blank">
        <Files {files} {onFiles} />
      </div>
    {:else}
      <div class="table">
        <Overflow overflow="y">
          <Table>
            {#each upload.files as file}
              <Cell>
                <div class="row">
                  <div class="name">{file.name}</div>
                  <div class="accessories">
                    {#if file.status === 'uploading'}
                      {file.progress}%
                    {:else if file.status === 'uploaded'}
                      Uploaded
                    {:else}
                      <Icon icon={LucideTrash_2} onClick={onRemove(file)} />
                    {/if}
                  </div>
                </div>
              </Cell>
            {/each}
          </Table>
        </Overflow>
      </div>
    {/if}
  </div>
  <Actions>
    <Button label="Cancel" onClick={onCancel} isDisabled={isCancelDisabled} />
    <Button label="Upload" onClick={onUpload} isDisabled={isUploadDisabled} />
  </Actions>
</Modal>

<style lang="scss">
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .blank {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    > .table {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin: 0 -10px;
      border-top: 1px solid var(--dark-border-color-1);
      border-bottom: 1px solid var(--dark-border-color-1);
    }
  }

  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    > .name {
      flex: 1;
    }
    > .accessories {
      user-select: none;
    }
  }
</style>
