<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    label,
    value,
    children,
  }: {
    label: string;
    value?: unknown;
    children?: Snippet;
  } = $props();
</script>

<div class="column">
  {#if label}
    <div class="label">{label}</div>
  {/if}
  <div class="content">
    {#if children}
      {@render children?.()}
    {:else}
      {value}
    {/if}
  </div>
</div>

<style lang="scss">
  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 10px;
    > .label {
      font-weight: 600;
    }
  }
</style>
