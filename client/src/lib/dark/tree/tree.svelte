<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';

  let {
    models,
    selected,
    item,
  }: {
    models: readonly T[];
    selected?: T;
    item: Snippet<[T]>;
  } = $props();
</script>

<div class="tree">
  {#each models as model}
    <div class="item" class:selected={model === selected}>
      {@render item(model)}
    </div>
  {/each}
</div>

<style lang="scss">
  .tree {
    > .item {
      padding: 5px 10px;
      border-bottom: 1px solid var(--dark-border-color);
      &.selected {
        background: var(--dark-border-color);
      }
    }
  }
</style>
