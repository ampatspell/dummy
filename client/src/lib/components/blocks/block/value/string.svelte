<script lang="ts">
  import { BlockPropertyStringValueModel, type BlockModel } from '../models/block.svelte';

  let {
    block,
    id,
    fallback,
  }: {
    block: BlockModel;
    id: string;
    fallback?: string;
  } = $props();

  let property = $derived(block.properties.byId(id));
  let model = $derived.by(() => {
    const value = property?.value;
    if (value instanceof BlockPropertyStringValueModel) {
      return value;
    }
  });
</script>

{model?.value || fallback}
