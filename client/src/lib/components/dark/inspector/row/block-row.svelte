<script lang="ts">
  import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
  import type { BlocksModel } from '$lib/components/blocks/models/blocks.svelte';
  import type { Property } from '$lib/utils/property.svelte';
  import BlockColumn from './column/block-column.svelte';
  import Row from './row.svelte';

  let { label, property, blocks }: { label: string; property: Property<BlockModel | undefined>; blocks: BlockModel[] } =
    $props();
</script>

<Row>
  <BlockColumn {label} {property} {blocks} />
</Row>
