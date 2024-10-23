<script lang="ts">
  import Icon from '$base/components/dark/icon.svelte';
  import type { Component } from 'svelte';

  let {
    icon,
    route,
    isCurrent,
  }: {
    icon: Component;
    route: string;
    isCurrent: boolean;
  } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<a class="item" class:current={isCurrent} href={route}>
  <Icon {icon} />
</a>

<style lang="scss">
  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: var(--size);
    height: var(--size);
    transition: 0.15s ease-in-out background-color;
    &.current {
      background: var(--dark-selected-background-color-2);
    }
    &:hover {
      background: var(--dark-selected-background-color-1);
    }
  }
</style>
