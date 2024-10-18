<script lang="ts">
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';
  import Image from './image.svelte';

  let { gallery }: { gallery: GalleryModel } = $props();

  let width = $state<number>();
  let gap = $state(5);
  let size = $derived.by(() => {
    if (width) {
      let columns = 5;
      let w = width - gap * (columns - 1);
      return Math.floor(w / columns);
    }
  });
</script>

<div class="grid" bind:clientWidth={width} style:--gap="{gap}px">
  {#if size}
    {#each gallery.images as image}
      <Image {image} {size} />
    {/each}
  {/if}
</div>

<style lang="scss">
  .grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--gap);
  }
</style>
