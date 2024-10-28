<script lang="ts">
  import Delete from '$dummy/components/dark/section/page/delete.svelte';
  import MasterDetail from '$dummy/components/dark/section/page/master-detail.svelte';
  import Page from '$dummy/components/dark/section/page/page.svelte';
  import Public from '$dummy/components/dark/section/page/public.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import type { VoidCallback } from '$dummy/lib/utils/types';
  import Detail from './detail.svelte';
  import Master from './master.svelte';

  let { onWillDelete, page }: { onWillDelete: VoidCallback; page: PageModel } = $props();
  let title = $derived(page.name);
  let route = $derived(page.url);

  let onDelete = async () => {
    onWillDelete();
    await page.delete();
  };
</script>

{#snippet actions()}
  <Public {route} />
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
