<script lang="ts" generics="T">
  import { type Snippet } from 'svelte';
  import { createGridContext } from './models/context.svelte';
  import { getter } from '$dummy/lib/utils/options';
  import Item from './item.svelte';
  import type { Point } from '$dummy/lib/utils/types';
  import { clientToPoint } from '$dummy/lib/utils/dom';

  let {
    models,
    selected,
    isEditable = false,
    onSelect,
    onReorder,
    item,
  }: {
    models: T[];
    selected: T[];
    isEditable?: boolean;
    onSelect?: (models: T[]) => void;
    onReorder?: (models: T[]) => void;
    item?: Snippet<[model: T]>;
  } = $props();

  let width = $state<number>(0);
  let element = $state<HTMLElement>();
  let mouse = $state<Point>();

  let context = createGridContext({
    element: getter(() => element),
    width: getter(() => width),
    mouse: getter(() => mouse),
    models: getter(() => models),
    selected: getter(() => selected),
    isEditable: getter(() => isEditable),
    onSelect: (models: T[]) => onSelect?.(models),
    onReorder: (models: T[]) => onReorder?.(models),
  });

  let measurements = $derived(context.measurements);
  let size = $derived(measurements.size);

  let onmouseup = () => context.drag.end();

  let onmousemove = (e: MouseEvent) => {
    mouse = clientToPoint(e);
    context.drag.update(e.target as HTMLElement, mouse);
  };
</script>

<svelte:window {onmouseup} {onmousemove} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="grid" bind:this={element} bind:clientWidth={width}>
  {#if size}
    <div class="content" style:--width="{size.width}px" style:--height="{size.height}px">
      {#each context.models as model (model)}
        <Item {model}>
          {@render item?.(model)}
        </Item>
      {/each}
    </div>
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
