<script lang="ts">
  import IdRow from '$lib/dark/inspector/row/id-row.svelte';
  import InputRow from '$lib/dark/inspector/row/input-row.svelte';
  import Section from '$lib/dark/inspector/section.svelte';
  import type { TextBlockModel } from '../models/blocks/block/block.svelte';

  let { model }: { model: TextBlockModel } = $props();
</script>

<Section>
  <IdRow value={model.id} />
  <InputRow label="Text" property={model.properties.text} />
</Section>
