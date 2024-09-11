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
    border-bottom: 1px solid var(--dark-border-color-2);
    padding: 10px;
    gap: 10px;
  }
</style>
