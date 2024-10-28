<script lang="ts">
  import { createNewPage, type PageModel } from '$dummy/lib/pages/page.svelte';
  import type { PagesModel } from '$dummy/lib/pages/pages.svelte';
  import type { Snippet } from 'svelte';
  import Add from '../../../dark/section/page/add.svelte';
  import Cell from '../../../dark/table/cell.svelte';
  import Table from '../../../dark/table/table.svelte';
  import Section from '../../../dark/section/section.svelte';
  import LucideNotebookText from '$dummy/components/icons/lucide--notebook-text.svelte';
  import { goto } from '$app/navigation';
  import Row from '$dummy/components/dark/table/row.svelte';
  import Content from '$dummy/components/dark/table/content.svelte';
  import Accessories from '$dummy/components/dark/table/accessories.svelte';
  import LucideEyeOff from '$dummy/components/icons/lucide--eye-off.svelte';
  import Icon from '$dummy/components/dark/icon.svelte';

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
  <Table>
    {#each pages.all as page}
      <Cell route={route(page)} isSelected={page.id === id}>
        <Row>
          <Content>
            {page.name}
          </Content>
          {#if !page.url}
            <Accessories>
              <Icon size="small" icon={LucideEyeOff} />
            </Accessories>
          {/if}
        </Row>
      </Cell>
    {/each}
  </Table>
{/snippet}

<Section title="Pages" icon={LucideNotebookText} {sidebar} {accessories}>
  {#if pages.isLoaded}
    {@render children()}
  {/if}
</Section>
