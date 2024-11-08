<script lang="ts">
  import Overflow from '$dummy/components/dark/overflow.svelte';
  import Placeholder from '$dummy/components/dark/section/placeholder.svelte';
  import type { LayoutModel } from '$dummy/lib/layouts/layout.svelte';

  let { layout }: { layout: LayoutModel } = $props();
</script>

<Overflow overflow="y">
  <Placeholder label={layout.description} />
</Overflow>
