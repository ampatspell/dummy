<script lang="ts">
  import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
  import ValueRow from '$lib/components/dark/inspector/row/value-row.svelte';
  import Section from '$lib/components/dark/inspector/section.svelte';
  import Properties from './properties/properties.svelte';

  let { model }: { model: BlockModel } = $props();
  const definition = $derived(model.definition);
</script>

<Section title="Block">
  {#if definition}
    <ValueRow label="Type" value={definition.id} />
  {:else}
    <ValueRow label="Type missing" value={model.data?.definition} />
  {/if}
</Section>

<Properties {model} />
