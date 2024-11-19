<script lang="ts">
  import Add from '$dummy/components/dark/section/page/add.svelte';
  import Delete from '$dummy/components/dark/section/page/delete.svelte';
  import MasterDetail from '$dummy/components/dark/section/page/master-detail.svelte';
  import Page from '$dummy/components/dark/section/page/page.svelte';
  import type { VoidCallback } from '$dummy/lib/utils/types';
  import Detail from './detail/detail.svelte';
  import Master from './master.svelte';
  import { openGalleryUploadModal } from './upload/models.svelte';
  import { getModalsContext } from '$dummy/components/dark/modals/base/context.svelte';
  import type { FolderModel } from '$dummy/lib/assets/gallery.svelte';

  let {
    gallery,
    onWillDelete,
  }: {
    gallery: FolderModel;
    onWillDelete: VoidCallback;
  } = $props();

  let title = $derived(gallery.name);
  let modals = getModalsContext();

  let onAdd = async () => {
    await openGalleryUploadModal(modals, {
      gallery,
    });
  };

  let onDelete = async () => {
    onWillDelete();
    await gallery.delete();
  };
</script>

{#snippet actions()}
  <Add {onAdd} />
  <Delete name="this gallery" {onDelete} />
{/snippet}

<Page {title} {actions}>
  <MasterDetail>
    {#snippet master()}
      <Master {gallery} />
    {/snippet}
    {#snippet detail()}
      <Detail {gallery} />
    {/snippet}
  </MasterDetail>
</Page>
