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
</script>

<svelte:window {onmouseup} {onmousemove} />

<div class="grid" bind:this={element} bind:clientWidth={width}>
  {#if size}
    {#if context.models.length}
      <div class="content" style:--width="{size.width}px" style:--height="{size.height}px">
        {#each context.models as model (model)}
          <Item {model}>
            {@render item?.(model)}
          </Item>
        {/each}
      </div>
    {:else}
      {@render placeholder?.()}
    {/if}
  {/if}
</div>

<style lang="scss">
  @use 'sass:color';
  .grid {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    > .content {
      position: absolute;
      top: 0;
      left: 0;
      width: var(--width);
      height: var(--height);
      overflow: hidden;
    }
  }
</style>
