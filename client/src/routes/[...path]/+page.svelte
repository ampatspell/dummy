<script lang="ts">
  import type { PageData } from './$types';
  import Path from '$dummy/components/frontend/path/path.svelte';

  let { data }: { data: PageData } = $props();

  let path = $derived(data.path);
</script>

{#if path}
  <Path {path} />
{/if}
