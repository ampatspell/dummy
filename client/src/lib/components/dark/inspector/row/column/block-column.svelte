<script lang="ts">
  import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
  import Dropdown from '$lib/components/dark/dropdown/dropdown.svelte';
  import type { Property } from '$lib/utils/property.svelte';
  import Column from './column.svelte';

  let { label, property, blocks }: { label: string; property: Property<BlockModel | undefined>; blocks: BlockModel[] } =
    $props();

  let models = $derived(blocks);
  let selected = $derived(property.value);
  let onSelect = (block?: BlockModel) => property.update(block);
</script>

<Column {label}>
  <Dropdown {models} {selected} {onSelect}>
    {#snippet children({ model })}
      {model.id} ({model.type})
    {/snippet}
  </Dropdown>
</Column>
