<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    children,
    route,
    isSelected: _isSelected,
  }: {
    children: Snippet;
    route?: string;
    isSelected?: boolean;
  } = $props();

  let isSelected = $derived(_isSelected ?? false);
</script>

{#snippet content()}
  {@render children?.()}
{/snippet}

{#if route}
  <a class="row has-action" class:selected={isSelected} href={route}>
    {@render content()}
  </a>
{:else}
  <div class="row no-action" class:selected={isSelected}>
    {@render content()}
  </div>
{/if}

<style lang="scss">
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 10px;
    min-height: 32px;
    border-bottom: 1px solid var(--dark-border-color-1);
    text-decoration: none;
    &.selected {
      background: var(--dark-selected-background-color-1);
    }
    &.has-action {
      &:hover {
        background: var(--dark-selected-background-color-1);
      }
    }
  }
</style>
