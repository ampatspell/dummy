<script lang="ts">
  import LucideImages from '$base/components/icons/lucide--images.svelte';
  import type { GalleriesModel } from '$base/lib/galleries/galleries.svelte';
  import { buildNewGalleryModel, type GalleryModel } from '$base/lib/galleries/gallery.svelte';
  import type { Snippet } from 'svelte';
  import Add from '../../page/add.svelte';
  import Row from '../../page/table/row.svelte';
  import Table from '../../page/table/table.svelte';
  import Section from '../../section/section.svelte';
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
    let gallery = buildNewGalleryModel({
      data: {
        name: 'Untitled',
      },
    });
    await gallery.save();
    await goto(route(gallery));
  };
</script>

{#snippet accessories()}
  <Add {onAdd} />
{/snippet}

{#snippet sidebar()}
  <Table>
    {#each galleries.all as gallery}
      <Row route={route(gallery)} isSelected={gallery.id === id}>
        {gallery.name}
      </Row>
    {/each}
  </Table>
{/snippet}

<Section title="Galleries" icon={LucideImages} {sidebar} {accessories}>
  {#if galleries.isLoaded}
    {@render children()}
  {/if}
</Section>
