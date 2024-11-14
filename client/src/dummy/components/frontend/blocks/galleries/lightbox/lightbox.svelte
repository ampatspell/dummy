<script lang="ts" module>
  export type LightboxOptions = {
    thumbnail: GalleryImageSize;
    captions: boolean;
    height: number | undefined;
  };
</script>

<script lang="ts">
  import type { GalleryImageSize } from '$dummy-shared/documents';
  import type { GalleryModel } from '$dummy/lib/galleries/gallery.svelte';
  import { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import { nextObject, prevObject } from '$dummy/lib/utils/array';
  import Image from './image.svelte';

  let {
    gallery,
    selected,
    options,
    onSelect: _onSelect,
  }: {
    gallery: GalleryModel;
    selected: GalleryImageModel | undefined;
    options: LightboxOptions;
    onSelect: (image: GalleryImageModel) => void;
  } = $props();

  let height = $derived(options.height);
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

  let onkeydown = (e: KeyboardEvent) => {
    const key = e.key;
    if (key === 'ArrowRight') {
      onPrevious();
    } else if (key === 'ArrowLeft') {
      onNext();
    }
  };
</script>

<svelte:window {onkeydown} />

{#if height}
  <div class="lightbox" style:--height="{height}px">
    <div class="content">
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="overlay left" onclick={onPrevious}></div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="overlay right" onclick={onNext}></div>
      <div class="images">
        {#each images as image}
          <Image {image} {options} isSelected={image === selected} />
        {/each}
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .lightbox {
    position: relative;
    height: var(--height);
    > .content {
      > .overlay {
        // background: rgba(255, 0, 0, 0.1);
        position: absolute;
        top: 0;
        bottom: 25px;
        z-index: 1;
        &.left {
          left: 0;
          right: 50%;
          cursor:
            url('/dummy/lucide--chevron-left.svg') 10 16,
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
      > .images {
        --padding: var(--dummy-block-lightbox-horizontal-padding, 0);
        position: absolute;
        top: 0;
        bottom: 0;
        left: var(--padding);
        right: var(--padding);
      }
    }
  }
</style>
