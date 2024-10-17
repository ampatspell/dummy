<script lang="ts">
  import Add from '$base/components/backend/page/add.svelte';
  import Page from '$base/components/backend/page/page.svelte';
  import Placeholder from '$base/components/backend/page/placeholder.svelte';
  import Row from '$base/components/backend/page/table/row.svelte';
  import Table from '$base/components/backend/page/table/table.svelte';
  import LucideImages from '$base/components/icons/lucide--images.svelte';
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte';
  import { GalleriesModel } from '$base/lib/galleries/galleries.svelte';

  let galleries = new GalleriesModel({});
  $effect(() => subscribe(galleries));
</script>

{#snippet actions()}
  <Add route="/backend/galleries/new" />
{/snippet}

<Page title="Galleries" icon={LucideImages} {actions}>
  {#if galleries.isLoaded}
    {#each galleries.all as gallery}
      <Table>
        <Row route="/backend/galleries/{gallery.id}">
          {gallery.name}
        </Row>
      </Table>
    {:else}
      <Placeholder label="There are no galleries yet" />
    {/each}
  {/if}
</Page>
