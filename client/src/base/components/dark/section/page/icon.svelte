<script lang="ts">
  import Icon from '$base/components/dark/icon.svelte';
  import type { VoidCallback } from '$base/lib/utils/types';
  import type { Component } from 'svelte';

  let {
    icon,
    onClick,
    route,
  }: {
    icon: Component;
    route?: string;
    onClick?: VoidCallback;
  } = $props();
</script>

{#snippet content()}
  <Icon {icon} {onClick} />
{/snippet}

{#if route}
  <a class="icon" href={route}>
    {@render content()}
  </a>
{:else}
  <div class="icon">
    {@render content()}
  </div>
{/if}

<style lang="scss">
  .icon {
    cursor: pointer;
  }
</style>
