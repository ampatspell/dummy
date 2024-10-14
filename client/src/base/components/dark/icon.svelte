<script lang="ts" module>
  export type IconSize = 'small' | 'regular' | 'medium' | 'large';
  export const iconSizes: { [key in IconSize]: number } = {
    'small': 12,
    'regular': 16,
    'medium': 18,
    'large': 32,
  };
</script>

<script lang="ts">
  import type { Component } from 'svelte';

  let {
    icon: Icon,
    size: _size,
    onClick
  }: {
    icon: Component;
    size?: IconSize;
    onClick?: (e: MouseEvent) => void;
  } = $props();

  let size = $derived(iconSizes[_size ?? 'regular']);

  let onclick = (e: MouseEvent) => {
    onClick?.(e);
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="icon" style:--size="{size}px" {onclick}>
  <Icon />
</div>

<style lang="scss">
  .icon {
    width: var(--size);
    height: var(--size);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>
