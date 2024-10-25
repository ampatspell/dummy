<script lang="ts">
  import { createNewPage, type PageModel } from '$base/lib/pages/page.svelte';
  import type { PagesModel } from '$base/lib/pages/pages.svelte';
  import type { Snippet } from 'svelte';
  import Add from '../../../dark/section/page/add.svelte';
  import Row from '../../../dark/table/row.svelte';
  import Table from '../../../dark/table/table.svelte';
  import Section from '../../../dark/section/section.svelte';
  import LucideNotebookText from '$base/components/icons/lucide--notebook-text.svelte';
  import { goto } from '$app/navigation';

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

  let onAdd = async () => {
    let model = await createNewPage();
    await goto(route(model));
  };
</script>

{#snippet accessories()}
  <Add {onAdd} />
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
