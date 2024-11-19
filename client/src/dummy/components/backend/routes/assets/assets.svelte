<script lang="ts">
  import LucideImages from '$dummy/components/icons/lucide--images.svelte';
  import type { Snippet } from 'svelte';
  import Add from '../../../dark/section/page/add.svelte';
  import Cell from '../../../dark/table/cell.svelte';
  import Table from '../../../dark/table/table.svelte';
  import Section from '../../../dark/section/section.svelte';
  import { goto } from '$app/navigation';
  import Content from '$dummy/components/dark/table/content.svelte';
  import Accessories from '$dummy/components/dark/table/accessories.svelte';
  import Row from '$dummy/components/dark/table/row.svelte';
  import type { FoldersModel } from '$dummy/lib/assets/folders.svelte';
  import { FolderModel, type FolderBaseModel } from '$dummy/lib/assets/folder.svelte';

  let {
    id,
    folders,
    route,
    children,
  }: {
    id: string | undefined;
    folders: FoldersModel;
    route: (model: FolderBaseModel) => string;
    children: Snippet;
  } = $props();

  let onAdd = async () => {
    let folder = await FolderModel.createNew();
    await goto(route(folder));
  };
</script>

{#snippet accessories()}
  <Add {onAdd} />
{/snippet}

{#snippet sidebar()}
  <Table>
    {#each folders.all as folder}
      <Cell route={route(folder)} isSelected={folder.id === id}>
        <Row>
          <Content>
            {folder.name}
          </Content>
          <Accessories type="faded">
            {folder.numberOfFiles}
          </Accessories>
        </Row>
      </Cell>
    {/each}
  </Table>
{/snippet}

<Section title="Assets" icon={LucideImages} {sidebar} {accessories}>
  {#if folders.isLoaded}
    {@render children()}
  {/if}
</Section>
