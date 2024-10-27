<script lang="ts">
  import { classes } from '$base/lib/utils/classes';
  import type { Snippet } from 'svelte';

  let {
    type: _type,
    size,
    children,
  }: {
    type?: 'regular' | 'blank';
    size?: { width: number; height: number };
    children?: Snippet;
  } = $props();

  let type = $derived(_type ?? 'regular');

  let style = $derived.by(() => {
    if (size) {
      let pair = (key: string, value: number) => `--${key}: ${value}px`;
      return [pair('width', size.width), pair('height', size.height)].join('; ');
    }
  });
</script>

<div class={classes('modal', `type-${type}`)} class:has-size={!!size} {style}>
  {@render children?.()}
</div>

<style lang="scss">
  @use 'sass:color';
  .modal {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: var(--dark-white-color);
    border: 1px solid color.adjust(#000, $alpha: -0.9);
    box-shadow:
      0 5px 10px color.adjust(#000, $alpha: -0.95),
      0 20px 40px color.adjust(#000, $alpha: -0.95);
    border-radius: 3px;
    gap: 10px;
    min-width: 200px;
    &.type-regular {
      padding: 10px;
    }
    &.has-size {
      width: var(--width);
      height: var(--height);
    }
  }
</style>
