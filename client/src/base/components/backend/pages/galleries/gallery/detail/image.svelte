<script lang="ts">
  import ButtonRow from '$base/components/dark/inspector/button-row.svelte';
  import Header from '$base/components/dark/inspector/header.svelte';
  import Section from '$base/components/dark/inspector/section.svelte';
  import type { GalleryImageModel } from '$base/lib/galleries/image.svelte';

  let { image }: { image: GalleryImageModel } = $props();
  let title = $derived(image.data?.name ?? '');

  let onDelete = async () => {
    await image.delete();
  };
</script>

<Section>
  <Header {title} />
</Section>
<Section>
  <ButtonRow label="Delete image" onClick={onDelete} />
</Section>
