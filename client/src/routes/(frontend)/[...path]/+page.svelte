<script lang="ts">
  import Page from '$dummy/components/frontend/page/page.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let runtime = $derived(data.runtime);
</script>

<Page {runtime} />
