<script lang="ts">
  import { classes } from '$lib/utils/classes';
  import type { Snippet } from 'svelte';

  let {
    type,
    children,
  }: {
    type: 'left' | 'right';
    children: Snippet;
  } = $props();
</script>

<div class={classes('card', `type-${type}`)}>
  {@render children()}
</div>

<style lang="scss">
  .card {
    flex: 1;
    display: flex;
    flex-direction: column;

    margin: 10px 0 10px 0;

    $radius: 8px;
    $border: 1px solid fade-out(#000, 0.9);

    border-top: $border;
    border-bottom: $border;

    &.type-left {
      border-top-right-radius: $radius;
      border-bottom-right-radius: $radius;
      border-right: $border;
    }
    &.type-right {
      border-top-left-radius: $radius;
      border-bottom-left-radius: $radius;
      border-left: $border;
    }
  }
</style>
