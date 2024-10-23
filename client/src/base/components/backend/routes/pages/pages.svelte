<script lang="ts">
  import LucideNotebookText from '$base/components/icons/lucide--notebook-text.svelte';
  import type { PageModel } from '$base/lib/pages/page.svelte';
  import type { PagesModel } from '$base/lib/pages/pages.svelte';
  import type { Snippet } from 'svelte';
  import Add from '../../page/add.svelte';
  import Page from '../../page/page.svelte';
  import Placeholder from '../../page/placeholder.svelte';
  import Row from '../../page/table/row.svelte';
  import Table from '../../page/table/table.svelte';
  import WithSidebar from '$base/components/dark/with-sidebar.svelte';

  let {
    id,
    pages,
    route,
    children,
  }: {
    id?: string;
    pages: PagesModel;
    route: (page: PageModel) => string;
    children: Snippet;
  } = $props();
</script>

{#snippet actions()}
  <Add route="/backend/pages/new" />
{/snippet}

<Page title="Pages" icon={LucideNotebookText} {actions}>
  <WithSidebar>
    {#snippet sidebar()}
      {#if pages.isLoaded}
        {#each pages.all as page}
          <Table>
            <Row route={route(page)} isSelected={page.id === id}>
              {page.name}
            </Row>
          </Table>
        {:else}
          <Placeholder label="There are no pages yet" />
        {/each}
      {/if}
    {/snippet}
    {@render children()}
  </WithSidebar>
</Page>
