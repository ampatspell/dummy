<script lang="ts" module>
  import { createContext } from '$lib/utils/context';
  import { getter, options, type OptionsInput } from '$lib/utils/options';

  export type TreeContextOptions<T> = {
    isSelected: (model: T) => boolean;
    onSelect: (model?: T) => void;
  };

  export class TreeContext<T = unknown> {
    options: TreeContextOptions<T>;

    constructor(opts: OptionsInput<TreeContextOptions<T>>) {
      this.options = options(opts);
    }

    isSelected = $derived.by(() => this.options.isSelected);

    onSelect(model?: T) {
      this.options.onSelect(model);
    }
  }

  export const treeContext = createContext('tree');
</script>

<script lang="ts" generics="T">
  import { type Snippet } from 'svelte';

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
