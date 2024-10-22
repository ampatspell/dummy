<script lang="ts">
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';
  import Gallery from './gallery.svelte';
  import Image from './image.svelte';
  import Images from './images.svelte';

  let { gallery }: { gallery: GalleryModel } = $props();

  let selected = $derived(gallery.runtime.selected);
</script>

<div class="detail">
  {#if selected.length}
    {#if selected.length > 1}
      <Images images={selected} />
    {:else}
      <Image image={selected[0]} />
    {/if}
  {:else}
    <Gallery {gallery} />
  {/if}
</div>

<style lang="scss">
  .detail {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
