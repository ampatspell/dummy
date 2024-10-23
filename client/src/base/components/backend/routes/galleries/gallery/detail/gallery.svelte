<script lang="ts">
  import Header from '$base/components/dark/inspector/header.svelte';
  import Section from '$base/components/dark/inspector/section.svelte';
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';

  let { gallery }: { gallery: GalleryModel } = $props();
  let title = 'Gallery';
</script>

<Section>
  <Header {title} />
</Section>
