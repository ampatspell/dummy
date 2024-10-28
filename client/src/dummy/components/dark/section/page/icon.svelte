<script lang="ts">
  import Icon from '$dummy/components/dark/icon.svelte';
  import type { VoidCallback } from '$dummy/lib/utils/types';
  import type { Component } from 'svelte';

  let {
    icon,
    onClick,
    route,
    element = $bindable(),
  }: {
    icon: Component;
    route?: string;
    onClick?: VoidCallback;
    element?: HTMLElement;
  } = $props();
</script>

{#snippet content()}
  <Icon {icon} {onClick} />
{/snippet}

{#if route}
  <a class="icon" href={route} bind:this={element}>
    {@render content()}
  </a>
{:else}
  <div class="icon" bind:this={element}>
    {@render content()}
  </div>
{/if}

<style lang="scss">
  .icon {
    cursor: pointer;
  }
</style>
