<script lang="ts">
  import Add from '$base/components/backend/page/add.svelte';
  import Page from '$base/components/backend/page/page.svelte';
  import LucideImages from '$base/components/icons/lucide--images.svelte';
</script>

{#snippet actions()}
  <Add route='/backend/galleries/new' />
{/snippet}

<Page title="Galleries" icon={LucideImages} {actions}></Page>
