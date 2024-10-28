<script lang="ts">
  import Overflow from '$dummy/components/dark/overflow.svelte';
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
  import type { GalleryModel } from '$dummy/lib/galleries/gallery.svelte';
  import Gallery from './gallery.svelte';
  import Image from './image.svelte';
  import Images from './images/images.svelte';

  let { gallery }: { gallery: GalleryModel } = $props();

  let selected = $derived(gallery.runtime.selected);
</script>

<Overflow overflow="y">
  <Inspector>
    {#if selected.length}
      {#if selected.length > 1}
        <Images images={selected} />
      {:else}
        <Image image={selected[0]} />
      {/if}
    {:else}
      <Gallery {gallery} />
    {/if}
  </Inspector>
</Overflow>
