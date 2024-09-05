<script lang="ts" generics="T">
  import { type Snippet } from 'svelte';
  import { TreeContext, treeContext } from './model.svelte';
  import { getter } from '$lib/utils/options';

  let {
    children,
    isSelected,
    onSelect,
  }: {
    children: Snippet;
    isSelected: (model: T) => boolean;
    onSelect: (model?: T) => void;
  } = $props();

  let deselect = () => {
    onSelect(undefined);
  };

  treeContext.set(
    new TreeContext<T>({
      isSelected: getter(() => isSelected),
      onSelect: getter(() => onSelect),
    }),
  );
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="tree" onclick={deselect}>
  {@render children()}
</div>

<style lang="scss">
  .tree {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
