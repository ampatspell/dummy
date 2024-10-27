<script lang="ts">
  import Delete from '$base/components/dark/section/page/delete.svelte';
  import MasterDetail from '$base/components/dark/section/page/master-detail.svelte';
  import Page from '$base/components/dark/section/page/page.svelte';
  import type { PageModel } from '$base/lib/pages/page.svelte';
  import type { VoidCallback } from '$base/lib/utils/types';
  import Detail from './detail.svelte';
  import Master from './master.svelte';

  let { onWillDelete, page }: { onWillDelete: VoidCallback; page: PageModel } = $props();
  let title = $derived(page.name);

  let onDelete = async () => {
    onWillDelete();
    await page.delete();
  };
</script>

{#snippet actions()}
  <Delete name="this page" {onDelete} />
{/snippet}

<Page {title} {actions}>
  <MasterDetail>
    {#snippet master()}
      <Master {page} />
    {/snippet}
    {#snippet detail()}
      <Detail {page} />
    {/snippet}
  </MasterDetail>
</Page>
