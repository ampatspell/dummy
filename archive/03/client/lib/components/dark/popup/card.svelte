<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="card">
  {@render children()}
</div>

<style lang="scss">
  .card {
    flex: 1;
    background: #fff;
    border: 1px solid fade-out(#000, 0.9);
    box-shadow: 1px 3px 6px fade-out(#000, 0.9);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
  }
</style>
