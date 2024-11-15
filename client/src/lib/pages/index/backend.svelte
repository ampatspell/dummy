<script lang="ts">
  import Placeholder from '$dummy/components/dark/section/placeholder.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let { page }: { page: PageModel } = $props();
</script>

<Placeholder label="No settings" />
