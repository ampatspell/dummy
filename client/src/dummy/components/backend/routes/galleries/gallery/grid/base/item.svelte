<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';
  import { getGridContext } from './models/context.svelte';
  import { getter } from '$dummy/lib/utils/options';
  import { clientToPoint } from '$dummy/lib/utils/dom';

  let { model, children }: { model: T; children?: Snippet } = $props();
  let context = getGridContext<T>();
  let size = $derived(context.measurements.item);
  let position = $derived(context.positionFor(model));
  let isEditable = $derived(context.isEditing);
  let isSelected = $derived(context.isSelected(model));
  let isDragging = $derived(context.drag.isDraggingModel(model));

  let element = $state<HTMLElement>();

  $effect(() => {
    return context.items.registerItem({
      model: getter(() => model),
      element: getter(() => element),
    });
  });

  let ondragstart = (e: DragEvent) => {
    e.preventDefault();

    let el = e.target as HTMLElement;
    let box = el.getBoundingClientRect();
    let mouse = clientToPoint(e);
    let offset = {
      x: mouse.x - box.left,
      y: mouse.y - box.top,
    };

    context.drag.start(model, offset);
  };

  let onmousedown = (e: MouseEvent) => {
    if (e.button === 0) {
      e.stopPropagation();
      context.select(model, e.shiftKey);
    }
  };
</script>

{#if size && position}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="item"
    class:editable={isEditable}
    class:selected={isSelected}
    class:dragging={isDragging}
    style:--size="{size}px"
    style:--x="{position.x}px"
    style:--y="{position.y}px"
    draggable={isEditable}
    bind:this={element}
    {onmousedown}
    {ondragstart}
  >
    <div class="content">
      {@render children?.()}
    </div>
  </div>
{/if}

<style lang="scss">
  @use 'sass:color';
  .item {
    position: absolute;
    width: var(--size);
    height: var(--size);
    transform: translate(var(--x), var(--y));
    min-width: 0;
    > .content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      background: #fff;
      border: 1px solid var(--dark-border-color-2);
      border-radius: 3px;
      transition:
        0.15s ease-in-out box-shadow,
        0.15s ease-in-out transform;
    }
    &.editable {
      &:hover {
        > .content {
          border-color: var(--dark-border-color-1);
          box-shadow: 0 1px 5px color.adjust(#000, $alpha: -0.9);
        }
      }
      &.selected {
        > .content {
          border-color: var(--dark-accent-color-1);
        }
      }
      &.dragging {
        z-index: 1;
        pointer-events: none;
        > .content {
          transform: scale(0.95);
          box-shadow: 0 1px 5px color.adjust(#000, $alpha: -0.9);
        }
      }
    }
  }
</style>
