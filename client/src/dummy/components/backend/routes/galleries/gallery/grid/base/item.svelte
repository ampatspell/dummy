<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';
  import { getter } from '$dummy/lib/utils/options';
  import { getGridContext } from './models/context.svelte';

  let { model, children }: { model: T; children?: Snippet } = $props();

  let context = getGridContext<T>();
  let size = $derived(context.measurements.size);
  let isDraggable = $derived(context.isEditing);

  let element = $state<HTMLDivElement>();

  $effect(() => {
    return context.items.registerItem({
      model: getter(() => model),
      element: getter(() => element),
    });
  });

  let ondragstart = (e: DragEvent) => {
    e.preventDefault();
    context.onDragStart(model);
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="item" bind:this={element} draggable={isDraggable} style:--size="{size}px" {ondragstart}>
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
