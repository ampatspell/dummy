<script lang="ts">
  import Add from '$base/components/backend/page/add.svelte';
  import Delete from '$base/components/backend/page/delete.svelte';
  import MasterDetail from '$base/components/backend/page/master-detail.svelte';
  import Page from '$base/components/backend/page/page.svelte';
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';
  import type { VoidCallback } from '$base/lib/utils/types';
  import Detail from './detail/detail.svelte';
  import Master from './master.svelte';

  let {
    gallery,
    onWillDelete,
    onUpload,
  }: {
    gallery: GalleryModel;
    onWillDelete: VoidCallback;
    onUpload: string;
  } = $props();

  let title = $derived(gallery.name);

  let onDelete = async () => {
    onWillDelete();
    await gallery.delete();
  };
</script>

{#snippet actions()}
  <Add route={onUpload} />
  <Delete {onDelete} />
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
