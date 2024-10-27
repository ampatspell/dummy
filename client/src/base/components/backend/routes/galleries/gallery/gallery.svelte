<script lang="ts">
  import Add from '$base/components/dark/section/page/add.svelte';
  import Delete from '$base/components/dark/section/page/delete.svelte';
  import MasterDetail from '$base/components/dark/section/page/master-detail.svelte';
  import Page from '$base/components/dark/section/page/page.svelte';
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';
  import type { VoidCallback } from '$base/lib/utils/types';
  import Detail from './detail/detail.svelte';
  import Master from './master.svelte';
  import { openGalleryUploadModal } from './upload/models.svelte';
  import { getModalsContext } from '$base/components/dark/modals/base/context.svelte';

  let {
    gallery,
    onWillDelete,
  }: {
    gallery: GalleryModel;
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
