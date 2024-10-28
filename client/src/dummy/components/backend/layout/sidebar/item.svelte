<script lang="ts">
  import Icon from '$dummy/components/dark/icon.svelte';
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
