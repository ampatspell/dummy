<script lang="ts">
  import Overflow from '$base/components/backend/page/overflow.svelte';
  import ButtonRow from '$base/components/dark/inspector/button-row.svelte';
  import Header from '$base/components/dark/inspector/header.svelte';
  import Inspector from '$base/components/dark/inspector/inspector.svelte';
  import Section from '$base/components/dark/inspector/section.svelte';
  import type { GalleryImageModel } from '$base/lib/galleries/image.svelte';
  import Image from './image.svelte';

  let { images }: { images: GalleryImageModel[] } = $props();

  let onDeleteAll = async () => {
    await Promise.all(images.map((image) => image.delete()));
  };

  let title = $derived(`${images.length} images selected`);
</script>

<Overflow overflow="y">
  <Inspector>
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
  </Inspector>
</Overflow>
