<script lang="ts">
  import type { Document, ImageData } from '$lib/types';

  let {
    image,
    onIntersection,
  }: {
    image: Document<ImageData>;
    onIntersection: (element: HTMLDivElement, image: Document<ImageData>, intersecting: boolean) => void;
  } = $props();

  let element = $state<HTMLDivElement>();

  $effect(() => {
    if (!element) {
      return;
    }

    let observer = new IntersectionObserver(
      ([entry]) => {
        onIntersection(element!, image, entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      },
    );
    observer.observe(element);
    return () => observer.disconnect();
  });
</script>

<div class="image" bind:this={element}>
  <img class="img" src={image.data.sizes['2048x2048'].url} alt={image.data.name} />
  <div class="name">{image.data.name}</div>
</div>

<style lang="scss">
  .image {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    > .img {
      object-fit: contain;
      width: 100%;
      max-height: calc(100vh - 100px);
    }
    > .name {
      font-size: 11px;
    }
  }
</style>
