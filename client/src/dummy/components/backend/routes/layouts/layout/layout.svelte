<script lang="ts">
  import Delete from '$dummy/components/dark/section/page/delete.svelte';
  import MasterDetail from '$dummy/components/dark/section/page/master-detail.svelte';
  import Page from '$dummy/components/dark/section/page/page.svelte';
  import type { LayoutModel } from '$dummy/lib/layouts/layout.svelte';
  import type { SiteModel } from '$dummy/lib/site/site.svelte';
  import type { VoidCallback } from '$dummy/lib/utils/types';
  import Detail from './detail.svelte';
  import Master from './master/master.svelte';

  let {
    layout,
    site,
    onWillDelete,
  }: {
    layout: LayoutModel;
    site: SiteModel;
    onWillDelete: VoidCallback;
  } = $props();

  let title = $derived(layout.name);

  let onDelete = async () => {
    onWillDelete();
    await layout.delete();
  };
</script>

{#snippet actions()}
  <Delete name="this layout" {onDelete} />
{/snippet}

<Page {title} {actions}>
  <MasterDetail>
    {#snippet master()}
      <Master {layout} />
    {/snippet}
    {#snippet detail()}
      <Detail {layout} {site} />
    {/snippet}
  </MasterDetail>
</Page>
