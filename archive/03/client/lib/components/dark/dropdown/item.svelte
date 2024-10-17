<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';
  import type { VoidCallback } from '$lib/utils/types';

  let {
    isSelected,
    onClick,
    children,
  }: {
    isSelected: boolean;
    onClick: VoidCallback;
    children: Snippet;
  } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="item" class:selected={isSelected} onclick={onClick}>
  {@render children()}
</div>

<style lang="scss">
  .item {
    font-weight: 600;
    line-height: 14px;
    min-height: 24px;
    padding: 3px 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 3px;
    &.selected {
      background: var(--dark-color);
      color: var(--dark-white-color);
    }
  }
</style>
