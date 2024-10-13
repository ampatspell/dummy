<script lang="ts">
  import BlockRow from '$lib/components/dark/inspector/row/block-row.svelte';
  import InputRow from '$lib/components/dark/inspector/row/input-row.svelte';
  import ValueRow from '$lib/components/dark/inspector/row/value-row.svelte';
  import Section from '$lib/components/dark/inspector/section.svelte';
  import type { PageModel } from '../models/page.svelte';

  let { model }: { model: PageModel } = $props();
</script>

<Section title="Page">
  <ValueRow label="Identifier" value={model.properties.identifier.value} />
  <InputRow label="Title" property={model.properties.title} />
  <BlockRow label="Block" property={model.properties.block} blocks={model.blocks.all} />
</Section>
