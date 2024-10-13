<script lang="ts">
  import type {
    BlockPropertyModel,
    BlockPropertyStringValueModel,
  } from '$lib/components/blocks/block/models/block.svelte';
  import InputRow from '$lib/components/dark/inspector/row/input-row.svelte';

  let { property }: { property: BlockPropertyModel } = $props();
  let value = property.value as BlockPropertyStringValueModel;
</script>

<InputRow label={property.id} property={value.property} />
