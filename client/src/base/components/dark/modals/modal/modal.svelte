<script lang="ts" module>
  import Actions from './actions.svelte';
  import Header from './header.svelte';
  export { Header, Actions };
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children?: Snippet } = $props();
</script>

<div class="modal">
  {@render children?.()}
</div>

<style lang="scss">
  @use 'sass:color';
  .modal {
    display: flex;
    flex-direction: column;
    background: var(--dark-white-color);
    box-shadow:
      0 5px 10px color.adjust(#000, $alpha: -0.8),
      0 10px 50px color.adjust(#000, $alpha: -0.8);
    border-radius: 6px;
    padding: 10px;
    gap: 10px;
    min-width: 200px;
  }
</style>
