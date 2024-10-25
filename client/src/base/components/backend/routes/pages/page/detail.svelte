<script lang="ts">
  import Inspector from '$base/components/dark/inspector/inspector.svelte';
  import Overflow from '$base/components/dark/overflow.svelte';
  import type { PageModel } from '$base/lib/pages/page.svelte';

  let { page }: { page: PageModel } = $props();
</script>

<Overflow overflow="y">
  <Inspector>
    {page}
  </Inspector>
</Overflow>
