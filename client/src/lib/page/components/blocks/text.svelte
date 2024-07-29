<script lang="ts">
  import type { TextBlockModel } from '$lib/page/models/blocks/block/block.svelte';

  let { block }: { block: TextBlockModel } = $props();
</script>

<div class="text-block">
  <div class="value">{block.text}</div>
</div>

<style lang="scss">
  .text-block {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>
