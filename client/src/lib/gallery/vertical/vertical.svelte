<script lang="ts">
  import type { Document, ImageData } from '$lib/types';
  import Image from './image.svelte';

  let { images }: { images: Document<ImageData>[] } = $props();

  let onIntersection = (element: HTMLDivElement, image: Document<ImageData>, intersecting: boolean) => {
    console.log(image.id, intersecting);
  };
</script>

<div class="images">
  {#each images as image}
    <Image {image} {onIntersection} />
  {/each}
</div>

<style lang="scss">
  .images {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
</style>
