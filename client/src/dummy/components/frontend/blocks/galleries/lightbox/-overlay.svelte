<script lang="ts">
  import type { VoidCallback } from '$dummy/lib/utils/types';

  let {
    onPrevious,
    onNext,
    isHidden,
  }: {
    onPrevious: VoidCallback;
    onNext: VoidCallback;
    isHidden: boolean;
  } = $props();
</script>

<div class="overlay" class:hidden={isHidden}>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="side left" onclick={onPrevious}></div>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="side right" onclick={onNext}></div>
</div>

<style lang="scss">
  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    > .side {
      position: absolute;
      top: 0;
      bottom: 0;
      &.left {
        left: 0;
        right: 50%;
        cursor:
          url('/dummy/lucide--chevron-left.svg') 13 16,
          auto;
      }
      &.right {
        left: 50%;
        right: 0;
        cursor:
          url('/dummy/lucide--chevron-right.svg') 20 16,
          auto;
      }
    }
    &.hidden {
      > .side {
        cursor: none;
      }
    }
  }
</style>
