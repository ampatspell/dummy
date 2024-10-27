<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    isSelected,
    children,
  }: {
    isSelected: boolean | undefined;
    children: Snippet;
  } = $props();
</script>

<div class="item" class:selected={isSelected}>
  {@render children()}
</div>

<style lang="scss">
  .item {
    display: flex;
    flex-direction: row;
    gap: 5px;
    &.selected {
      font-weight: 600;
    }
  }
</style>
