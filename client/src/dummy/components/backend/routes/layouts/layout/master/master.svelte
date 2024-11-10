<script lang="ts">
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
  import Overflow from '$dummy/components/dark/overflow.svelte';
  import Placeholder from '$dummy/components/dark/section/placeholder.svelte';
  import type { LayoutModel } from '$dummy/lib/layouts/layout.svelte';
  import Layout from './layout.svelte';
  import Pages from './pages/pages.svelte';

  let { layout }: { layout: LayoutModel } = $props();

  let definition = $derived(layout.definition);
</script>

{#if definition}
  <Overflow overflow="y">
    <Inspector>
      <Layout {layout} />
      <Pages {layout} />
    </Inspector>
  </Overflow>
{:else}
  <Placeholder label="Layout definition missing" />
{/if}
