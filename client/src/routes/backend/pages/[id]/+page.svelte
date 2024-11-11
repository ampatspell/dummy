<script lang="ts">
  import { goto } from '$app/navigation';
  import Page from '$dummy/components/backend/routes/pages/page/page.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let page = $derived(data.page);

  let onWillDelete = () => {
    goto('/backend/pages');
  };
</script>

<Page {page} {onWillDelete} />
