<script lang="ts">
  import { createNewPage, type PageModel } from '$base/lib/pages/page.svelte';
  import type { PagesModel } from '$base/lib/pages/pages.svelte';
  import type { Snippet } from 'svelte';
  import Add from '../../../dark/section/page/add.svelte';
  import Cell from '../../../dark/table/cell.svelte';
  import Table from '../../../dark/table/table.svelte';
  import Section from '../../../dark/section/section.svelte';
  import LucideNotebookText from '$base/components/icons/lucide--notebook-text.svelte';
  import { goto } from '$app/navigation';
  import Row from '$base/components/dark/table/row.svelte';
  import Content from '$base/components/dark/table/content.svelte';
  import Accessories from '$base/components/dark/table/accessories.svelte';
  import LucideEyeOff from '$base/components/icons/lucide--eye-off.svelte';
  import Icon from '$base/components/dark/icon.svelte';

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
