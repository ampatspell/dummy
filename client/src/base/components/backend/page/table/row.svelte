<script lang="ts">
  import type { VoidCallback } from '$base/lib/utils/types';
  import type { Snippet } from 'svelte';

  let {
    children,
    route,
  }: {
    children: Snippet;
    route: string;
  } = $props();
</script>

<a class="row" href={route}>
  {@render children?.()}
</a>

<style lang="scss">
  .row {
    display: flex;
    flex-direction: row;
    padding: 10px;
    border-bottom: 1px solid var(--dark-border-color-1);
    text-decoration: none;
    &:hover {
      background: var(--dark-selected-background-color);
    }
  }
</style>
