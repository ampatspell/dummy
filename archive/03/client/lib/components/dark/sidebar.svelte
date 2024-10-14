<script lang="ts">
  import { classes } from '$lib/utils/classes';
  import type { Snippet } from 'svelte';

  let {
    children,
    position,
  }: {
    children: Snippet;
    position: 'left' | 'right';
  } = $props();
</script>

<div class={classes('sidebar', `position-${position}`)}>
  {@render children()}
</div>

<style lang="scss">
  .sidebar {
    display: flex;
    flex-direction: column;
    &.position-left {
      border-right: 1px solid var(--dark-border-color-1);
    }
    &.position-right {
      border-left: 1px solid var(--dark-border-color-1);
    }
  }
</style>
