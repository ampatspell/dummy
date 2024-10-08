<script lang="ts">
  import IdRow from '$lib/dark/inspector/row/id-row.svelte';
  import Section from '$lib/dark/inspector/section.svelte';
  import type { PlaceholderBlockModel } from '$lib/page/models/blocks/block/block.svelte';

  let { model }: { model: PlaceholderBlockModel } = $props();
</script>

<Section>
  <IdRow value={model.id} />
</Section>
