<script lang="ts">
  import type { Document, ImageData } from '$lib/types';
  import { LoadedImage } from '../loaded.svelte';

  let {
    image,
  }: {
    image: Document<ImageData>;
  } = $props();

  let url = $derived(image.data.sizes['2048x2048'].url);
  let loaded = $derived(new LoadedImage(url));
</script>

<div class="image" class:loading={!loaded.isLoaded}>
  <img class="img" src={loaded.url} alt={image.data.name} />
  <div class="name">{image.data.name}</div>
</div>

<style lang="scss">
  .image {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    opacity: 1;
    transition: opacity 0.1s ease-in-out;
    > .img {
      object-fit: contain;
      width: 100%;
      max-height: calc(100vh - 100px);
    }
    > .name {
      font-size: 11px;
    }
    &.loading {
      opacity: 0;
    }
  }
</style>
