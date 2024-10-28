<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="content">
  {@render children?.()}
</div>

<style lang="scss">
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
