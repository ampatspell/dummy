<script lang="ts">
  import type { TextBlockDefinition } from '$lib/types';

  let { block }: { block: TextBlockDefinition } = $props();
</script>

<div class="text-block">
  <div class="value">{block.value}</div>
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
