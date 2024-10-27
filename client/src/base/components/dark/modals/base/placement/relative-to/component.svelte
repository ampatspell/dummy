<script lang="ts">
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
  let left = $derived(rect.left);
  let top = $derived(rect.top);
</script>

<div class="relative-to" bind:this={content} style:--left="{left}px" style:--top="{top}px">
  {@render children()}
</div>

<style lang="scss">
  .relative-to {
    position: fixed;
    left: var(--left);
    top: var(--top);
  }
</style>
