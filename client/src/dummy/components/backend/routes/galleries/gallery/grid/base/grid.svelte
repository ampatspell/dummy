<script lang="ts" generics="T">
  import type { Point, VoidCallback } from '$dummy/lib/utils/types';
  import { type Snippet } from 'svelte';
  import Item from './item.svelte';
  import { createGridContext } from './models/context.svelte';
  import { getter } from '$dummy/lib/utils/options';
  import { clientToPoint } from '$dummy/lib/utils/dom';

  let {
    isEditing,
    models,
    selected,
    onSelect,
    onReorder,
    placeholder,
    item,
  }: {
    isEditing: boolean;
    models: T[];
    selected: T[];
    onSelect: (models: T[]) => void;
    onReorder: (models: T[]) => void;
    placeholder: Snippet;
    item: Snippet<[model: T]>;
  } = $props();

  let context = createGridContext<T>({
    isEditing: getter(() => isEditing),
    models: getter(() => models),
    selected: getter(() => selected),
    onSelect: (models) => onSelect(models),
    onReorder: (models) => onReorder(models),
  });

  let onclick = () => onSelect([]);
  let onmouseup = (e: Event) => {
    context.onDragEnd();
  };

  let mouse = $state<Point>();
  let onmousemove = (e: MouseEvent) => {
    mouse = clientToPoint(e);

    let target = e.target as HTMLElement;
    context.onDragUpdate(target, mouse);
  };
</script>

<svelte:window {onmouseup} {onmousemove} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="grid" bind:clientWidth={context.measurements.width} style:--gap="{context.measurements.gap}px" {onclick}>
  {#if context.measurements.size}
    {#if context.models.length}
      <div class="content">
        {#each context.models as model}
          <Item {model}>
            {@render item(model)}
          </Item>
        {/each}
      </div>
    {:else}
      {@render placeholder()}
    {/if}
  {/if}
</div>

<style lang="scss">
  @use 'sass:color';
  .grid {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--gap);
    }
  }
</style>
