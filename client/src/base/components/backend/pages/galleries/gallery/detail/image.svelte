<script lang="ts">
  import Header from '$base/components/dark/inspector/header.svelte';
  import Section from '$base/components/dark/inspector/section.svelte';
  import type { GalleryImageModel } from '$base/lib/galleries/image.svelte';

  let { image }: { image: GalleryImageModel } = $props();
  let title = $derived(image.data?.name ?? '');
</script>

<Section>
  <Header {title} />
</Section>
