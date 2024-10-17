<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    children,
  }: {
    children?: Snippet;
  } = $props();
</script>

<div class="actions">
  {@render children?.()}
</div>

<style lang="scss">
  .actions {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>
