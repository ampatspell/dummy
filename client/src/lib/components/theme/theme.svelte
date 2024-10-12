<script lang="ts">
  import type { Snippet } from 'svelte';
  import './theme.scss';

  let { children }: { children: Snippet } = $props();
</script>

<div class="theme amateurinmotion">
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
