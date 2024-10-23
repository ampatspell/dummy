<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children?: Snippet } = $props();
</script>

<div class="section">
  {@render children?.()}
</div>

<style lang="scss">
  .section {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--dark-border-color-2);
    &:first-child {
      border-top: none;
    }
  }
</style>
