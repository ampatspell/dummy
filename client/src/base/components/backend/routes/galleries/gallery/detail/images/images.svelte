<script lang="ts">
  import ButtonRow from '$base/components/dark/inspector/button-row.svelte';
  import Header from '$base/components/dark/inspector/header.svelte';
  import Section from '$base/components/dark/inspector/section.svelte';
  import type { GalleryImageModel } from '$base/lib/galleries/image.svelte';
  import Image from './image.svelte';

  let { images }: { images: GalleryImageModel[] } = $props();

  let onDeleteAll = async () => {
    await Promise.all(images.map((image) => image.delete()));
  };

  let title = $derived(`${images.length} images selected`);
</script>

<Section>
  <Header {title} />
</Section>
<Section>
  {#each images as image}
    <Image {image} />
  {/each}
</Section>
<Section>
  <ButtonRow label="Delete selected images" onClick={onDeleteAll} />
</Section>
