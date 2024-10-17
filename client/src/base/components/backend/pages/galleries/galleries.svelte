<script lang="ts">
  import LucideImages from '$base/components/icons/lucide--images.svelte';
  import type { GalleriesModel } from '$base/lib/galleries/galleries.svelte';
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';
  import Add from '../../page/add.svelte';
  import Page from '../../page/page.svelte';
  import Placeholder from '../../page/placeholder.svelte';
  import Row from '../../page/table/row.svelte';
  import Table from '../../page/table/table.svelte';

  let { galleries, route }: { galleries: GalleriesModel; route: (model: GalleryModel) => string } = $props();
</script>

{#snippet actions()}
  <Add route="/backend/galleries/new" />
{/snippet}

<Page title="Galleries" icon={LucideImages} {actions}>
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
</Page>
