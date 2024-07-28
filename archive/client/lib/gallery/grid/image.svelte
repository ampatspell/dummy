<script lang="ts">
  import type { Document, ImageData } from '$lib/types';
  import { LoadedImage, getImageResizeObserver } from '../loaded.svelte';

  let {
    image,
  }: {
    image: Document<ImageData>;
  } = $props();

  let url = $derived(image.data.sizes['120x120'].url);
  let loaded = $derived(new LoadedImage(url));

  let element = $state<HTMLDivElement>();
  let size = $state<number | undefined>();
  let observer = getImageResizeObserver();

  $effect(() => {
    if (element && observer) {
      return observer.observe(element, (next) => (size = next));
    }
  });
</script>

<div class="image" class:loading={!loaded.isLoaded} bind:this={element} style:--size="{size}px">
  <img class="img" src={loaded.url} alt={image.data.name} />
</div>

<style lang="scss">
  .image {
    height: var(--size);
    display: flex;
    flex-direction: column;
    > .img {
      object-fit: contain;
      width: 100%;
      height: 100%;
      opacity: 1;
      transition: opacity 0.1s ease-in-out;
    }
    &.loading {
      > .img {
        opacity: 0;
      }
    }
  }
</style>
