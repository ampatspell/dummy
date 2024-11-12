<script lang="ts">
  import type { GalleryImageSize } from '$dummy-shared/documents';
  import type { GalleryModel } from '$dummy/lib/galleries/gallery.svelte';
  import { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import { nextObject } from '$dummy/lib/utils/array';
  import Image from './image.svelte';

  let {
    gallery,
    selected,
    thumbnail,
    height,
    onClick: _onClick,
  }: {
    gallery: GalleryModel;
    selected: GalleryImageModel | undefined;
    thumbnail: GalleryImageSize;
    height: number | undefined;
    onClick: (image: GalleryImageModel) => void;
  } = $props();

  let images = $derived(gallery.images);

  let onClick = () => {
    let next = nextObject(images, selected, true);
    if (next) {
      _onClick(next);
    }
  };
</script>

{#if height}
  <div class="lightbox" style:--height="{height}px">
    {#each images as image}
      <Image {image} {thumbnail} isSelected={image === selected} {onClick} />
    {/each}
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
  }
</style>
