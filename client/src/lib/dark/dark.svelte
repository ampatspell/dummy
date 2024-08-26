<script lang="ts">
  import type { Snippet } from 'svelte';
  import './dark.scss';

  let { children }: { children: Snippet } = $props();
</script>

<div class="dark">
  {@render children()}
</div>

<style lang="scss">
  @use './dark.scss' as dark;
  .dark {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #fff;
    cursor: default;
    @include dark.font();
  }
</style>
