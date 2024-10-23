<script lang="ts">
  import Page from '$base/components/backend/page/page.svelte';
  import LucideNotebookText from '$base/components/icons/lucide--notebook-text.svelte';
  import type { PageModel } from '$base/lib/pages/page.svelte';

  let { page }: { page: PageModel } = $props();
  let title = $derived(`Page "${page.name}"`);
</script>

<Page {title} icon={LucideNotebookText}>
  {page}
</Page>
