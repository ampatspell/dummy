<script lang="ts">
  import './theme.scss';
  import type { PathWithArgs } from '$dummy/lib/pages/path.svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet; path?: PathWithArgs } = $props();
</script>

<div class="theme">
  {@render children()}
</div>

<style lang="scss">
  .theme {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family: var(--theme-font-family);
    font-size: var(--theme-font-size);
    font-weight: var(--theme-font-weight);
    cursor: default;
  }
</style>
