<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    children,
  }: {
    children?: Snippet;
  } = $props();
</script>

<div class="row">
  {@render children?.()}
</div>

<style lang="scss">
  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
</style>
