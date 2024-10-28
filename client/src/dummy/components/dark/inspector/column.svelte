<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    label,
    flex: _flex,
    children,
  }: {
    label?: string;
    flex?: boolean;
    children?: Snippet;
  } = $props();

  let flex = $derived(_flex ?? true);
</script>

<div class="column" class:flex>
  {#if label}
    <div class="label">{label}</div>
  {/if}
  <div class="content">
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
    &.flex {
      flex: 1;
    }
  }
</style>
