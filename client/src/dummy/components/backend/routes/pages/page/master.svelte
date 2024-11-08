<script lang="ts">
  import Overflow from '$dummy/components/dark/overflow.svelte';
  import Placeholder from '$dummy/components/dark/section/placeholder.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';

  let { page }: { page: PageModel } = $props();
  let definition = $derived(page.definition);
  let Component = $derived(definition?.backend);
</script>

<Overflow overflow="y">
  {#if definition}
    <Component {page} />
  {:else}
    <Placeholder label="Page definition missing" />
  {/if}
</Overflow>
