<script lang="ts">
  import { px } from '$base/lib/utils/number';
  import { getter } from '$base/lib/utils/options';
  import type { PlacementComponentProps } from '../placement.svelte';
  import { RelativeToPlacementObserver } from './observer.svelte';
  import type { RelativeToPlacement } from './relative-to.svelte';

  let { modal, children }: PlacementComponentProps = $props();
  let placement = $derived(modal.placement as RelativeToPlacement);

  let content = $state<HTMLDivElement>();

  let observer = new RelativeToPlacementObserver({
    placement: getter(() => placement),
    content: getter(() => content),
  });

  let rect = $derived(observer.rect);
  let left = $derived(px(rect?.left));
  let top = $derived(px(rect?.top));
</script>

<div class="relative-to" class:has-position={!!rect} bind:this={content} style:--left={left} style:--top={top}>
  {@render children()}
</div>

<style lang="scss">
  .relative-to {
    position: fixed;
    display: none;
    &.has-position {
      display: block;
      left: var(--left);
      top: var(--top);
    }
  }
</style>
