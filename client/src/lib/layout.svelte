<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="layout">
  {@render children()}
</div>

<style lang="scss">
  .layout {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
