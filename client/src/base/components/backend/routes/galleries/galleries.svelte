<script lang="ts">
  import LucideImages from '$base/components/icons/lucide--images.svelte';
  import type { GalleriesModel } from '$base/lib/galleries/galleries.svelte';
  import { createNewGallery, type GalleryModel } from '$base/lib/galleries/gallery.svelte';
  import type { Snippet } from 'svelte';
  import Add from '../../../dark/section/page/add.svelte';
  import Cell from '../../../dark/table/cell.svelte';
  import Table from '../../../dark/table/table.svelte';
  import Section from '../../../dark/section/section.svelte';
  import { goto } from '$app/navigation';

  let {
    id,
    galleries,
    route,
    children,
  }: {
    id: string | undefined;
    galleries: GalleriesModel;
    route: (model: GalleryModel) => string;
    children: Snippet;
  } = $props();

  let onAdd = async () => {
    let gallery = await createNewGallery();
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
        {gallery.name}
      </Cell>
    {/each}
  </Table>
{/snippet}

<Section title="Galleries" icon={LucideImages} {sidebar} {accessories}>
  {#if galleries.isLoaded}
    {@render children()}
  {/if}
</Section>
