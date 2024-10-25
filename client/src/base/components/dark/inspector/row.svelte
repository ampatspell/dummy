<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children?: Snippet } = $props();
</script>

<div class="row">
  {@render children?.()}
</div>

<style lang="scss">
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    min-height: 32px;
    gap: 5px;
    border-bottom: 1px solid var(--dark-border-color-2);
  }
</style>
