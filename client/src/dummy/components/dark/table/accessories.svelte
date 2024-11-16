<script lang="ts">
  import type { Snippet } from 'svelte';
  import { classes } from '$dummy/lib/utils/classes';

  let {
    type = 'regular',
    children,
  }: {
    type?: 'regular' | 'faded';
    children: Snippet;
  } = $props();
</script>

<div class={classes('accessories', `type-${type}`)}>
  {@render children()}
</div>

<style lang="scss">
  .accessories {
    display: flex;
    flex-direction: row;
    gap: 5px;
    &.type-faded {
      color: var(--dark-faded-color-1);
    }
  }
</style>
