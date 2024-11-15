<script lang="ts">
  import LucideImages from '$dummy/components/icons/lucide--images.svelte';
  import type { GalleriesModel } from '$dummy/lib/galleries/galleries.svelte';
  import { GalleryBaseModel, GalleryModel } from '$dummy/lib/galleries/gallery.svelte';
  import type { Snippet } from 'svelte';
  import Add from '../../../dark/section/page/add.svelte';
  import Cell from '../../../dark/table/cell.svelte';
  import Table from '../../../dark/table/table.svelte';
  import Section from '../../../dark/section/section.svelte';
  import { goto } from '$app/navigation';
  import Content from '$dummy/components/dark/table/content.svelte';
  import Accessories from '$dummy/components/dark/table/accessories.svelte';
  import Row from '$dummy/components/dark/table/row.svelte';

  let {
    id,
    galleries,
    route,
    children,
  }: {
    id: string | undefined;
    galleries: GalleriesModel;
    route: (model: GalleryBaseModel) => string;
    children: Snippet;
  } = $props();

  let onAdd = async () => {
    let gallery = await GalleryModel.createNew();
    await goto(route(gallery));
  };
</script>

{#snippet accessories()}
  <Add {onAdd} />
{/snippet}

{#snippet sidebar()}
  <Table>
    {#each galleries.all as gallery}
      <Cell route={route(gallery)} isSelected={gallery.id === id}>
        <Row>
          <Content>
            {gallery.name}
          </Content>
          <Accessories>
            {gallery.numberOfImages}
          </Accessories>
        </Row>
      </Cell>
    {/each}
  </Table>
{/snippet}

<Section title="Galleries" icon={LucideImages} {sidebar} {accessories}>
  {#if galleries.isLoaded}
    {@render children()}
  {/if}
</Section>
