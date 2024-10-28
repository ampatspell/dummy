<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children?: Snippet } = $props();
</script>

<div class="inspector">
  {@render children?.()}
</div>

<style lang="scss">
  .inspector {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
