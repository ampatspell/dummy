<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    label,
    isDisabled,
    onClick,
    children,
  }: {
    isDisabled?: boolean;
    onClick: (e: MouseEvent) => void;
    label?: string;
    children?: Snippet;
  } = $props();

  let onclick = (e: MouseEvent) => {
    onClick(e);
  };
</script>

<button class="button" disabled={isDisabled ?? false} {onclick}>
  {#if children}
    {@render children()}
  {:else}
    {label}
  {/if}
</button>

<style lang="scss">
  .button {
    appearance: none;
    outline: none;
    background: var(--dark-color);
    color: var(--dark-white-color);
    font-family: var(--dark-font-family);
    font-size: var(--dark-font-size);
    width: 100%;
    font-weight: 600;
    line-height: 14px;
    padding: 3px 8px;
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
</style>
