<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getGridContext } from './grid.svelte';

  let { isDraggable, children }: { isDraggable: boolean; children?: Snippet } = $props();

  let context = getGridContext();
  let size = $derived(context.size);
</script>

<div class="item" draggable={isDraggable} style:--size="{size}px">
  {@render children?.()}
</div>

<style lang="scss">
  @use 'sass:color';
  .item {
    width: var(--size);
    height: var(--size);
    display: flex;
    flex-direction: column;
  }
</style>
