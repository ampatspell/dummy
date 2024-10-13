<script lang="ts">
  import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
  import Section from '$lib/components/dark/inspector/section.svelte';
  import type { IntroBlockModel } from './models.svelte';

  let props: { block: BlockModel } = $props();
  let block = $derived(props.block as IntroBlockModel);
</script>

<Section title="Intro"></Section>
