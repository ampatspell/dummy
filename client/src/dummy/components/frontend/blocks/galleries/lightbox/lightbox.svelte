<script lang="ts" module>
  import type { AssetsImageSize } from '$dummy-shared/documents';
  import type { FolderModel } from '$dummy/lib/assets/gallery.svelte';
  import type { FileModel } from '$dummy/lib/assets/image.svelte';

  export type LightboxOptions = {
    thumbnail: AssetsImageSize;
    captions: boolean;
    height: number | undefined;
    horizontalPadding: number;
  };
</script>

<script lang="ts">
  import { nextObject, prevObject } from '$dummy/lib/utils/array';
  import type { VoidCallback } from '$dummy/lib/utils/types';
  import Image from './-image.svelte';
  import Overlay from './-overlay.svelte';

  let {
    gallery,
    selected,
    options,
    onSelect: _onSelect,
  }: {
    gallery: FolderModel;
    selected: FileModel | undefined;
    options: LightboxOptions;
    onSelect: (image: FileModel) => void;
  } = $props();

  let height = $derived(options.height);
  let horizontalPadding = $derived(options.horizontalPadding);
  let images = $derived(gallery.images);

  let cursor = $state(true);

  let onSelect = (image?: FileModel) => {
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
    ArrowRight: () => onNext(),
    ArrowLeft: () => onPrevious(),
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
    <div class="images" style:--horizontal-padding="{horizontalPadding}px">
      {#each images as image}
        <Image {image} {options} isSelected={image === selected} />
      {/each}
    </div>
    <Overlay {onPrevious} {onNext} isHidden={!cursor} />
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
