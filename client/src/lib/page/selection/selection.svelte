<script lang="ts">
  import Dark from '$lib/dark/dark.svelte';
  import Sidebar from '$lib/dark/sidebar.svelte';
  import type { PageModel } from '../models/page.svelte';

  let { page }: { page: PageModel } = $props();
</script>

<Dark>
  <Sidebar position="right" width={200}>{page.blocks.selected ?? page}</Sidebar>
</Dark>

<style lang="scss">
</style>
