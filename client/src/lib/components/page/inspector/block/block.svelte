<script lang="ts">
  import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
  import ValueRow from '$lib/components/dark/inspector/row/value-row.svelte';
  import Section from '$lib/components/dark/inspector/section.svelte';

  let { model: block }: { model: BlockModel } = $props();
  let Inspector = block.inspector;
</script>

<Inspector {block} />
