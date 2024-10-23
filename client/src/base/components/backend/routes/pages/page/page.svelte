<script lang="ts">
  import type { PageModel } from '$base/lib/pages/page.svelte';

  let { page }: { page: PageModel } = $props();
</script>

{page}
