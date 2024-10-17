<script lang="ts">
  import Delete from '$base/components/backend/page/delete.svelte';
  import MasterDetail from '$base/components/backend/page/master-detail.svelte';
  import Page from '$base/components/backend/page/page.svelte';
  import LucideImages from '$base/components/icons/lucide--images.svelte';
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';
  import { isTruthy } from '$base/lib/utils/array';
  import { quote } from '$base/lib/utils/string';
  import type { VoidCallback } from '$base/lib/utils/types';

  let {
    gallery,
    onWillDelete,
  }: {
    gallery: GalleryModel;
    onWillDelete: VoidCallback;
  } = $props();

  let title = $derived.by(() => {
    return ['Gallery', quote(gallery.name)].filter(isTruthy).join(' ');
  });

  let onDelete = async () => {
    onWillDelete();
    await gallery.delete();
  };
</script>

{#snippet actions()}
  <Delete {onDelete} />
{/snippet}

<Page {title} icon={LucideImages} {actions}>
  <MasterDetail>
    {#snippet master()}
      master
    {/snippet}
    {#snippet detail()}
      detail
    {/snippet}
  </MasterDetail>
</Page>
