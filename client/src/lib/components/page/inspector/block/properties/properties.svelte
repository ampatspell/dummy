<script lang="ts">
  import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
  import Section from '$lib/components/dark/inspector/section.svelte';
  import Block from './block.svelte';
  import String from './string.svelte';

  let { model }: { model: BlockModel } = $props();
</script>

<Section title="Properties">
  {#each model.properties.all as property}
    {#if property.type === 'string'}
      <String {property} />
    {:else if property.type === 'block'}
      <Block {property} />
    {/if}
  {/each}
</Section>
