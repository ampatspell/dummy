<script lang="ts">
  import Overflow from '$dummy/components/dark/overflow.svelte';
  import Placeholder from '$dummy/components/dark/section/placeholder.svelte';
  import type { LayoutModel } from '$dummy/lib/layouts/layout.svelte';

  let { layout }: { layout: LayoutModel } = $props();

  let definition = $derived(layout.definition);
  let Component = $derived(definition?.backend);
</script>

{#if definition}
  <Overflow overflow="y">
    <Component {layout} />
  </Overflow>
{:else}
  <Placeholder label="Layout definition missing" />
{/if}
