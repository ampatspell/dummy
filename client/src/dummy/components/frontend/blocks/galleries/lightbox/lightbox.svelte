<script lang="ts">
  import type { GalleryImageSize } from '$dummy-shared/documents';
  import type { GalleryModel } from '$dummy/lib/galleries/gallery.svelte';
  import { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import { nextObject, prevObject } from '$dummy/lib/utils/array';
  import type { VoidCallback } from '$dummy/lib/utils/types';
  import Image from './image.svelte';

  let {
    gallery,
    selected,
    thumbnail,
    height,
    onSelect: _onSelect,
    onDown,
  }: {
    gallery: GalleryModel;
    selected: GalleryImageModel | undefined;
    thumbnail: GalleryImageSize;
    height: number | undefined;
    onSelect: (image: GalleryImageModel) => void;
    onDown: VoidCallback;
  } = $props();

  let images = $derived(gallery.images);

  let onSelect = (image?: GalleryImageModel) => {
    if (image) {
      _onSelect(image);
    }
  };

  let onPrevious = () => {
    onSelect(prevObject(images, selected, true));
  };

  let onNext = () => {
    onSelect(nextObject(images, selected, true));
  };
</script>

{#if height}
  <div class="lightbox" style:--height="{height}px">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="overlay left" onclick={onPrevious}></div>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="overlay right" onclick={onNext}></div>
    {#if onDown}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="overlay bottom" onclick={onDown}></div>
    {/if}
    <div class="images">
      {#each images as image}
        <Image {image} {thumbnail} isSelected={image === selected} />
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  .lightbox {
    height: var(--height);
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    > .overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 1;
      --extend: -50px;
      &.left {
        left: var(--extend);
        right: 50%;
        cursor: url('/dummy/lucide--chevron-left.svg'), auto;
      }
      &.right {
        left: 50%;
        right: var(--extend);
        cursor: url('/dummy/lucide--chevron-right.svg'), auto;
      }
      &.bottom {
        top: auto;
        height: 100px;
        left: var(--extend);
        right: var(--extend);
        bottom: 0;
        cursor: url('/dummy/lucide--chevron-down.svg'), auto;
      }
    }
  }
</style>
