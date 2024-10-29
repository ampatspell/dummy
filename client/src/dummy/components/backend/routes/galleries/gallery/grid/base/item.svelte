<script lang="ts">
  import { delay } from '$dummy/lib/utils/promise';
  import type { Snippet } from 'svelte';
  import { getGridContext } from './grid.svelte';

  let { children }: { children?: Snippet } = $props();

  let context = getGridContext();
  let size = $derived(context.size);

  let isDragging = $state(false);

  let ondragstart = async () => {
    await delay(0);
    isDragging = true;
  };

  let ondragend = () => {
    isDragging = false;
  };
</script>

<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  class="item"
  class:is-dragging={isDragging}
  draggable="true"
  role="button"
  style:--size="{size}px"
  {ondragstart}
  {ondragend}
>
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
