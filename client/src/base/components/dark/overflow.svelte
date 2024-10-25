<script lang="ts">
  import { classes } from '$base/lib/utils/classes';
  import type { Snippet } from 'svelte';

  let {
    overflow,
    children,
  }: {
    overflow: 'x' | 'y' | 'both';
    children?: Snippet;
  } = $props();
</script>

<div class={classes('overflow', `overflow-${overflow}`)}>
  <div class="content">
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .overflow {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    > .content {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      flex-direction: column;
    }
    &.overflow-x {
      > .content {
        overflow-x: auto;
      }
    }
    &.overflow-y {
      > .content {
        overflow-y: auto;
      }
    }
    &.overflow-both {
      > .content {
        overflow: auto;
      }
    }
  }
</style>
