<script lang="ts" module>
  export type LightboxOptions = {
    thumbnail: GalleryImageSize;
    captions: boolean;
    height: number | undefined;
    horizontalPadding: number;
  };
</script>

<script lang="ts">
  import type { GalleryImageSize } from '$dummy-shared/documents';
  import type { GalleryModel } from '$dummy/lib/galleries/gallery.svelte';
  import { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import { nextObject, prevObject } from '$dummy/lib/utils/array';
  import type { VoidCallback } from '$dummy/lib/utils/types';
  import Image from './image.svelte';
  import Overlay from './overlay.svelte';

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
  let horizontalPadding = $derived(options.horizontalPadding);
  let images = $derived(gallery.images);

  let cursor = $state(true);

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

  let handlers: { [key: string]: VoidCallback } = {
    ArrowRight: () => onPrevious(),
    ArrowLeft: () => onNext(),
  };

  let onkeydown = (e: KeyboardEvent) => {
    let fn = handlers[e.key];
    if (fn) {
      fn();
      cursor = false;
    }
  };

  let onmousemove = () => (cursor = true);
</script>

<svelte:window {onkeydown} {onmousemove} />

{#if height}
  <div class="lightbox" style:--height="{height}px">
    <Overlay {onPrevious} {onNext} isHidden={!cursor} />
    <div class="images" style:--horizontal-padding="{horizontalPadding}px">
      {#each images as image}
        <Image {image} {options} isSelected={image === selected} />
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  .lightbox {
    position: relative;
    height: var(--height);
    > .images {
      position: absolute;
      top: 0;
      bottom: 0;
      left: var(--horizontal-padding);
      right: var(--horizontal-padding);
    }
  }
</style>
