<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children?: Snippet } = $props();
</script>

<div class="row">
  {@render children?.()}
</div>

<style lang="scss">
  .row {
    padding: 10px;
    display: flex;
    flex-direction: row;
    gap: 5px;
    border-bottom: 1px solid var(--dark-border-color-2);
  }
</style>
