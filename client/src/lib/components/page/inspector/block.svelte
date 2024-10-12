<script lang="ts">
  import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
  import Row from '$lib/components/dark/inspector/row/row.svelte';
  import Section from '$lib/components/dark/inspector/section.svelte';

  let { model }: { model: BlockModel } = $props();
</script>

<Section title="Block">
  <Row>
    {model}
  </Row>
</Section>
