<script lang="ts" generics="T">
  import { type Snippet } from 'svelte';
  import { getter } from '$dummy/lib/utils/options';
  import type { Point } from '$dummy/lib/utils/types';
  import { clientToPoint } from '$dummy/lib/utils/dom';
  import { createGridContext } from './models/context.svelte';
  import Item from './item.svelte';

  let {
    models,
    selected,
    isEditing = false,
    onSelect,
    onReorder,
    item,
    placeholder,
  }: {
    models: T[];
    selected: T[];
    isEditing?: boolean;
    onSelect?: (models: T[]) => void;
    onReorder?: (models: T[]) => void;
    item?: Snippet<[model: T]>;
    placeholder?: Snippet;
  } = $props();

  let width = $state<number>(0);
  let element = $state<HTMLElement>();
  let mouse = $state<Point>();

  let context = createGridContext<T>({
    element: getter(() => element),
    width: getter(() => width),
    mouse: getter(() => mouse),
    models: getter(() => models),
    selected: getter(() => selected),
    isEditing: getter(() => isEditing),
    onSelect: (models: T[]) => onSelect?.(models),
    onReorder: (models: T[]) => onReorder?.(models),
  });

  let measurements = $derived(context.measurements);
  let size = $derived(measurements.size);

  let onmouseup = () => {
    context.drag.end();
  };

  let onmousemove = (e: MouseEvent) => {
    mouse = clientToPoint(e);
    context.drag.update(e.target as HTMLElement, mouse);
  };

  let onmousedown = () => {
    if (!context.drag.isDragging) {
      onSelect?.([]);
    }
  };
</script>

<svelte:window {onmouseup} {onmousemove} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="grid" bind:this={element} bind:clientWidth={width} {onmousedown}>
  {#if context.models.length}
    {#if size}
      <div class="content" style:--width="{size.width}px" style:--height="{size.height}px">
        {#each context.models as model (model)}
          <Item {model}>
            {@render item?.(model)}
          </Item>
        {/each}
      </div>
    {/if}
  {:else}
    {@render placeholder?.()}
  {/if}
</div>

<style lang="scss">
  .grid {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .content {
      position: relative;
      width: var(--width);
      height: var(--height);
    }
  }
</style>
