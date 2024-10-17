<script lang="ts">
  import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
  import InputRow from '$lib/components/dark/inspector/row/input-row.svelte';
  import Section from '$lib/components/dark/inspector/section.svelte';
  import type { HamsterBlockModel } from './models.svelte';

  let props: { block: BlockModel } = $props();
  let block = $derived(props.block as HamsterBlockModel);
</script>

<Section title="Hamster">
  <InputRow label="Greeting" property={block.greeting} />
</Section>
