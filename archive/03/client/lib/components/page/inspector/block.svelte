<script lang="ts">
  import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';

  let { model: block }: { model: BlockModel } = $props();
  let Inspector = $derived(block.inspector);
</script>

<Inspector {block} />
