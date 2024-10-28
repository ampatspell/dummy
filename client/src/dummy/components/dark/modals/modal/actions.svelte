<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children?: Snippet } = $props();
</script>

<div class="actions">
  {@render children?.()}
</div>

<style lang="scss">
  .actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 5px;
  }
</style>
