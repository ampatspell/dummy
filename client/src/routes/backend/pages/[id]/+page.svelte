<script lang="ts">
  import { goto } from '$app/navigation';
  import Page from '$base/components/backend/routes/pages/page/page.svelte';
  import { getPageContext } from './context.svelte';

  let context = getPageContext();
  let page = $derived(context.page);

  let onWillDelete = () => {
    goto('/backend/pages');
  };
</script>

{#if page.isLoaded}
  <Page {page} {onWillDelete} />
{/if}
