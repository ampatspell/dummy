<script lang="ts">
  import Dark from '$base/components/dark/dark.svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<Dark>
  <div class="backend">
    {@render children()}
  </div>
</Dark>

<style lang="scss">
  .backend {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
