<script lang="ts">
  import Page from '$base/components/backend/page/page.svelte';
  import type { PageModel } from '$base/lib/pages/page.svelte';

  let { page }: { page: PageModel } = $props();
  let title = $derived(page.name);
</script>

<Page {title}>
  {page}
</Page>
