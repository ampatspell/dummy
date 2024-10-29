<script lang="ts">
  import './theme.scss';
  import type { Snippet } from 'svelte';
  import type { Path } from '$dummy/lib/pages/path.svelte';

  let { children, path }: { children: Snippet; path?: Path } = $props();
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
