<script lang="ts">
  import { classes } from '$lib/utils/classes';
  import type { Snippet } from 'svelte';

  let {
    children,
    width,
    position,
  }: {
    children?: Snippet;
    width: number;
    position: 'left' | 'right';
  } = $props();
</script>

<div class={classes('sidebar', `position-${position}`)} style:--width="{width}px">
  {@render children?.()}
</div>

<style lang="scss">
  .sidebar {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: var(--width);
    $border: 1px solid var(--dark-border-color-1);
    &.position-left {
      border-right: $border;
    }
    &.position-right {
      border-left: $border;
    }
  }
</style>
