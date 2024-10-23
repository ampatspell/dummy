<script lang="ts">
  import LucideNotebookText from '$base/components/icons/lucide--notebook-text.svelte';
  import Add from '../../page/add.svelte';
  import Page from '../../page/page.svelte';
  import Placeholder from '../../page/placeholder.svelte';
</script>

{#snippet actions()}
  <Add route="/backend/pages/new" />
{/snippet}

<Page title="Pages" icon={LucideNotebookText} {actions}>
  <!-- {#if galleries.isLoaded}
    {#each galleries.all as gallery}
      <Table>
        <Row route={route(gallery)}>
          {gallery.name}
        </Row>
      </Table>
    {:else} -->
  <Placeholder label="There are no pages yet" />
  <!-- {/each} -->
  <!-- {/if} -->
</Page>
