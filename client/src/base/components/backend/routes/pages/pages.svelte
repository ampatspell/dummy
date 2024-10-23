<script lang="ts">
  import type { PageModel } from '$base/lib/pages/page.svelte';
  import type { PagesModel } from '$base/lib/pages/pages.svelte';
  import type { Snippet } from 'svelte';
  import Add from '../../page/add.svelte';
  import Row from '../../page/table/row.svelte';
  import Table from '../../page/table/table.svelte';
  import Section from '../../section/section.svelte';
  import LucideNotebookText from '$base/components/icons/lucide--notebook-text.svelte';

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

{#snippet accessories()}
  <Add route="/backend/pages/new" />
{/snippet}

{#snippet sidebar()}
  {#each pages.all as page}
    <Table>
      <Row route={route(page)} isSelected={page.id === id}>
        {page.name}
      </Row>
    </Table>
  {/each}
{/snippet}

<Section title="Pages" icon={LucideNotebookText} {sidebar} {accessories}>
  {#if pages.isLoaded}
    {@render children()}
  {/if}
</Section>
