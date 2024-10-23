<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    flex: _flex,
    children,
  }: {
    flex?: boolean;
    children?: Snippet;
  } = $props();

  let flex = $derived(_flex ?? true);
</script>

<div class="column" class:flex>
  {@render children?.()}
</div>

<style lang="scss">
  .column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    &.flex {
      flex: 1;
    }
  }
</style>
