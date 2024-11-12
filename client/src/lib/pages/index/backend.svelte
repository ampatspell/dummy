<script lang="ts">
  import Placeholder from '$dummy/components/dark/section/placeholder.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';

  let { page }: { page: PageModel } = $props();
</script>

<Placeholder label="No settings" />
