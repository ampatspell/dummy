<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="table">
  {@render children?.()}
</div>

<style lang="scss">
  .table {
    display: flex;
    flex-direction: column;
  }
</style>
