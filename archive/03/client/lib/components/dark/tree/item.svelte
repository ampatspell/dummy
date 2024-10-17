<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';
  import { TreeContext, treeContext } from './model.svelte';

  let {
    model,
    children,
  }: {
    model: T;
    children: Snippet;
  } = $props();

  let context = treeContext.get() as TreeContext<T>;
  let isSelected = $derived(context.isSelected(model));

  let select = (e: Event, model: T) => {
    e.stopPropagation();
    context.onSelect(model);
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="item" class:selected={isSelected} onclick={(e) => select(e, model)}>
  {@render children()}
</div>

<style lang="scss">
  .item {
    user-select: none;
    padding: 5px 10px;
    border-bottom: 1px solid var(--dark-border-color-2);
    &.selected {
      background: var(--dark-selected-background-color);
    }
  }
</style>
