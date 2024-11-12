<script lang="ts">
  import type { Component } from 'svelte';
  import Icon from './icon.svelte';

  let { icon, label }: { icon: Component; label?: string } = $props();
</script>

<div class="placeholder">
  <div class="icon">
    <Icon {icon} size="large" />
  </div>
  {#if label}
    <div class="label">{label}</div>
  {/if}
</div>

<style lang="scss">
  .placeholder {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    > .icon {
      opacity: 0.1;
    }
  }
</style>
