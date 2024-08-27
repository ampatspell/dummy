<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';

  let {
    models,
    selected,
    item,
    onSelect,
  }: {
    models: readonly T[];
    selected?: T;
    item: Snippet<[T]>;
    onSelect: (model?: T) => void;
  } = $props();

  let deselect = () => {
    onSelect(undefined);
  };

  let select = (e: Event, model: T) => {
    e.stopPropagation();
    onSelect(model);
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="tree" onclick={deselect}>
  {#each models as model}
    <div class="item" class:selected={model === selected} onclick={(e) => select(e, model)}>
      {@render item(model)}
    </div>
  {/each}
</div>

<style lang="scss">
  .tree {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .item {
      user-select: none;
      padding: 5px 10px;
      border-bottom: 1px solid var(--dark-border-color-2);
      &.selected {
        background: var(--dark-selected-background-color);
      }
    }
  }
</style>
