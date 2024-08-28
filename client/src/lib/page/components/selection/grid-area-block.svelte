<script lang="ts">
  import Section from '$lib/dark/inspector/section.svelte';
  import type { GridAreaBlockModel } from '$lib/page/models/blocks/block/block.svelte';

  let { model }: { model: GridAreaBlockModel } = $props();
</script>

<Section></Section>
