<script lang="ts">
  import type { GalleryImageSize } from '$dummy-shared/documents';
  import type { GalleryModel } from '$dummy/lib/galleries/gallery.svelte';
  import { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import { nextObject } from '$dummy/lib/utils/array';
  import Image from './image.svelte';

  let {
    gallery,
    thumbnail,
    height,
  }: {
    gallery: GalleryModel;
    thumbnail: GalleryImageSize;
    height: number | undefined;
  } = $props();

  let images = $derived(gallery.images);
  let selected = $state<GalleryImageModel>();

  $effect.pre(() => {
    selected = images[0];
  });

  let onClick = () => {
    selected = nextObject(images, selected, true);
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
