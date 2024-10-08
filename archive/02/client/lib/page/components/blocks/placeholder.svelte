<script lang="ts">
  import type { PlaceholderBlockModel } from '$lib/page/models/blocks/block/block.svelte';

  let { block }: { block: PlaceholderBlockModel } = $props();

  let width = 'auto';
  let height = 'auto';
</script>

<div class="placeholder" style:--width={width} style:--height={height}>
  <div class="content">{block.id}</div>
</div>

<style lang="scss">
  .placeholder {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: var(--width);
    height: var(--height);

    $a: fade-out(red, 0.97);
    $b: fade-out(red, 0.94);
    $step: 10px;
    background: repeating-linear-gradient(45deg, $a, $a $step, $b $step, $b $step * 2);
  }
</style>
