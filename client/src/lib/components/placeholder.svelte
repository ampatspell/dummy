<script lang="ts">
  import type { Snippet } from "svelte";

  let { width, height, children }: { width?: string; height?: string; children?: Snippet } = $props();
</script>

<div class="placeholder" style:--width={width ?? 'auto'} style:--height={height ?? 'auto'}>
  {@render children?.()}
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
