<script lang="ts">
  import LucideImages from '$base/components/icons/lucide--images.svelte';
  import type { GalleriesModel } from '$base/lib/galleries/galleries.svelte';
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';
  import type { Snippet } from 'svelte';
  import Add from '../../page/add.svelte';
  import Page from '../../page/page.svelte';
  import Placeholder from '../../page/placeholder.svelte';
  import Row from '../../page/table/row.svelte';
  import Table from '../../page/table/table.svelte';
  import WithSidebar from '$base/components/dark/with-sidebar.svelte';

  let {
    galleries,
    route,
    children,
  }: { galleries: GalleriesModel; route: (model: GalleryModel) => string; children: Snippet } = $props();
</script>

{#snippet actions()}
  <Add route="/backend/galleries/new" />
{/snippet}

<Page title="Galleries" icon={LucideImages} {actions}>
  <WithSidebar>
    {#snippet sidebar()}
      {#if galleries.isLoaded}
        {#each galleries.all as gallery}
          <Table>
            <Row route={route(gallery)}>
              {gallery.name}
            </Row>
          </Table>
        {:else}
          <Placeholder label="There are no galleries yet" />
        {/each}
      {/if}
    {/snippet}
    {@render children()}
  </WithSidebar>
</Page>
