<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="accessories">
  {@render children()}
</div>

<style lang="scss">
  .accessories {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }
</style>
