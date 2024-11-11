<script lang="ts">
  import { goto } from '$app/navigation';
  import Layout from '$dummy/components/backend/routes/layouts/layout/layout.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let layout = $derived(data.layout);
  let site = $derived(data.site);

  let onWillDelete = () => {
    goto('/backend/layouts');
  };
</script>

<Layout {layout} {site} {onWillDelete} />
