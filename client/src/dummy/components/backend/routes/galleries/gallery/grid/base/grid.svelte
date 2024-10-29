<script lang="ts" module>
  import { Model } from '$dummy/lib/firebase/fire/model.svelte';
  import { createContext } from '$dummy/lib/utils/context';
  import { getter, type OptionsInput } from '$dummy/lib/utils/options';

  export type GridContextOptions = {
    size: number | undefined;
  };

  export class GridContext extends Model<GridContextOptions> {
    size = $derived(this.options.size);
  }

  let { get: getGridContext, set: setGridContext } = createContext<GridContext>('grid');

  export { getGridContext };

  export const createGridContext = (opts: OptionsInput<GridContextOptions>) => setGridContext(new GridContext(opts));
</script>

<script lang="ts">
  import type { VoidCallback } from '$dummy/lib/utils/types';
  import type { Snippet } from 'svelte';

  let { onClick, children }: { onClick?: VoidCallback; children?: Snippet } = $props();

  let width = $state<number>();
  let gap = 5;

  let columns = $derived.by(() => {
    if (width) {
      return Math.floor(width / 150);
    }
  });

  let size = $derived.by(() => {
    if (width && columns) {
      let w = width - gap * (columns - 1);
      let size = w / columns;
      return Math.floor(size);
    }
  });

  createGridContext({
    size: getter(() => size),
  });

  let onclick = () => {
    onClick?.();
  };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="grid" bind:clientWidth={width} style:--gap="{gap}px" {onclick}>
  {#if size}
    <div class="content">
      {@render children?.()}
    </div>
  {/if}
</div>

<style lang="scss">
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
