<script lang="ts">
  import type { VoidCallback } from '$base/lib/utils/types';
  import type { Snippet } from 'svelte';

  let {
    children,
    route,
  }: {
    children: Snippet;
    route?: string;
  } = $props();
</script>

{#snippet content()}
  {@render children?.()}
{/snippet}

{#if route}
  <a class="row has-action" href={route}>
    {@render content()}
  </a>
{:else}
  <div class="row no-action">
    {@render content()}
  </div>
{/if}

<style lang="scss">
  .row {
    display: flex;
    flex-direction: row;
    padding: 10px;
    border-bottom: 1px solid var(--dark-border-color-1);
    text-decoration: none;
    &.has-action {
      &:hover {
        background: var(--dark-selected-background-color);
      }
    }
  }
</style>
