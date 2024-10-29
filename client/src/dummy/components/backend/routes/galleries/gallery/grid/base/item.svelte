<script lang="ts">
  import { delay } from '$dummy/lib/utils/promise';
  import type { Snippet } from 'svelte';
  import { getGridContext } from './grid.svelte';

  let { isDraggable, children }: { isDraggable: boolean; children?: Snippet } = $props();

  let context = getGridContext();
  let size = $derived(context.size);
</script>

<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="item" draggable={isDraggable} role="button" style:--size="{size}px">
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
