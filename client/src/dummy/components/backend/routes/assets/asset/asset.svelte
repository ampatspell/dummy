<script lang="ts">
  import Add from '$dummy/components/dark/section/page/add.svelte';
  import Delete from '$dummy/components/dark/section/page/delete.svelte';
  import MasterDetail from '$dummy/components/dark/section/page/master-detail.svelte';
  import Page from '$dummy/components/dark/section/page/page.svelte';
  import type { VoidCallback } from '$dummy/lib/utils/types';
  import Detail from './detail/detail.svelte';
  import Master from './master.svelte';
  import { openFolderUploadModal } from './upload/models.svelte';
  import { getModalsContext } from '$dummy/components/dark/modals/base/context.svelte';
  import type { FolderModel } from '$dummy/lib/assets/folder.svelte';

  let {
    folder,
    onWillDelete,
  }: {
    folder: FolderModel;
    onWillDelete: VoidCallback;
  } = $props();

  let title = $derived(folder.name);
  let modals = getModalsContext();

  let onAdd = async () => {
    await openFolderUploadModal(modals, {
      folder,
    });
  };

  let onDelete = async () => {
    onWillDelete();
    await folder.delete();
  };
</script>

{#snippet actions()}
  <Add {onAdd} />
  <Delete name="this folder" {onDelete} />
{/snippet}

<Page {title} {actions}>
  <MasterDetail>
    {#snippet master()}
      <Master {folder} />
    {/snippet}
    {#snippet detail()}
      <Detail {folder} />
    {/snippet}
  </MasterDetail>
</Page>
