<script lang="ts">
  import type { Document, ImageData } from '$lib/types';
  import Image from './image.svelte';

  let { images }: { images: Document<ImageData>[] } = $props();
</script>

<div class="grid">
  {#each images as image}
    <Image {image} />
  {/each}
</div>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 25px;
  }
</style>
