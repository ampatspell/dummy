<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    size,
    children,
  }: {
    size?: { width: number; height: number };
    children?: Snippet;
  } = $props();

  let style = $derived.by(() => {
    if (size) {
      let pair = (key: string, value: number) => `--${key}: ${value}px`;
      return [pair('width', size.width), pair('height', size.height)].join('; ');
    }
  });
</script>

<div class="modal" class:has-size={!!size} {style}>
  {@render children?.()}
</div>

<style lang="scss">
  @use 'sass:color';
  .modal {
    display: flex;
    flex-direction: column;
    background: var(--dark-white-color);
    box-shadow:
      0 5px 10px color.adjust(#000, $alpha: -0.8),
      0 10px 50px color.adjust(#000, $alpha: -0.8);
    border-radius: 3px;
    padding: 10px;
    gap: 10px;
    min-width: 200px;
    &.has-size {
      width: var(--width);
      height: var(--height);
    }
  }
</style>
