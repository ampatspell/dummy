<script lang="ts">
  import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
  import BlockRow from '$lib/components/dark/inspector/row/block-row.svelte';
  import Section from '$lib/components/dark/inspector/section.svelte';
  import type { GalleryBlockModel } from './models.svelte';

  let props: { block: BlockModel } = $props();
  let block = $derived(props.block as GalleryBlockModel);
</script>

<Section title="Gallery">
  <BlockRow label="Header" property={block.header.property} blocks={block.header.blocks} />
  <BlockRow label="Footer" property={block.footer.property} blocks={block.footer.blocks} />
</Section>
