<script lang="ts">
  import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
  import Column from '$lib/components/dark/inspector/row/column/column.svelte';
  import InputRow from '$lib/components/dark/inspector/row/input-row.svelte';
  import Row from '$lib/components/dark/inspector/row/row.svelte';
  import Section from '$lib/components/dark/inspector/section.svelte';
  import { setGlobal } from '$lib/utils/set-global';
  import type { HamsterBlockModel } from './models.svelte';

  let props: { block: BlockModel } = $props();
  let block = $derived(props.block as HamsterBlockModel);
</script>

<Section title="Hamster">
  <Row>
    <Column>{block}</Column>
  </Row>
  <InputRow label="Greeting" property={block.greeting} />
</Section>
