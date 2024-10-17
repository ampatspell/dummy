<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    label,
    isDisabled: _isDisabled,
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

  let isDisabled = $derived(_isDisabled ?? false);
</script>

<button class="button" class:disabled={isDisabled} disabled={isDisabled} {onclick}>
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
    border: none;
    background: var(--dark-color);
    color: var(--dark-white-color);
    font-family: var(--dark-font-family);
    font-size: var(--dark-font-size);
    width: 100%;
    font-weight: 600;
    line-height: 14px;
    padding: 5px 8px;
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    max-width: max-content;
    gap: 8px;
    transition: 0.15s ease-in-out opacity;
    &.disabled {
      opacity: 0.25;
    }
  }
</style>
