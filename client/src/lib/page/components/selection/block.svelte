<script lang="ts">
  import Header from '$lib/dark/inspector/header.svelte';
  import Inspector from '$lib/dark/inspector/inspector.svelte';
  import Column from '$lib/dark/inspector/row/column.svelte';
    import DevRow from '$lib/dark/inspector/row/dev-row.svelte';
  import Row from '$lib/dark/inspector/row/row.svelte';
  import Section from '$lib/dark/inspector/section.svelte';
  import {
    GridAreaBlockModel,
    GridBlockModel,
    PlaceholderBlockModel,
    TextBlockModel,
    type BlockModel,
  } from '$lib/page/models/blocks/block/block.svelte';
  import GridAreaBlock from './grid-area-block.svelte';
  import GridBlock from './grid-block.svelte';
  import PlaceholderBlock from './placeholder-block.svelte';
  import TextBlock from './text-block.svelte';

  let { model }: { model: BlockModel } = $props();
  let title = $derived(model.info.type);
</script>

<Inspector>
  <Header {title} />
  {#if model instanceof GridBlockModel}
    <GridBlock {model} />
  {:else if model instanceof GridAreaBlockModel}
    <GridAreaBlock {model} />
  {:else if model instanceof TextBlockModel}
    <TextBlock {model} />
  {:else if model instanceof PlaceholderBlockModel}
    <PlaceholderBlock {model} />
  {:else}
    <Section>
      <Row>
        <Column label="Unsupported block" value={model} />
      </Row>
    </Section>
  {/if}
  <Section>
    <DevRow name="block" {model} />
  </Section>
</Inspector>
