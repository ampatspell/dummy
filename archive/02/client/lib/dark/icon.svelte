<script lang="ts">
  import type { Component } from 'svelte';

  let { icon: Icon, onClick }: { icon: Component; onClick?: (e: MouseEvent) => void } = $props();

  let onclick = (e: MouseEvent) => {
    onClick?.(e);
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="icon" {onclick}>
  <Icon />
</div>

<style lang="scss">
  .icon {
    width: 16px;
    height: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>
