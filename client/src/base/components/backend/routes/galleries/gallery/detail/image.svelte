<script lang="ts">
  import ButtonRow from '$base/components/dark/inspector/button-row.svelte';
  import Header from '$base/components/dark/inspector/header.svelte';
  import Section from '$base/components/dark/inspector/section.svelte';
  import { getModalsContext } from '$base/components/dark/modals/base/context.svelte';
  import { withDeleteConfirmationModal } from '$base/components/dark/modals/confirmation/models';
  import type { GalleryImageModel } from '$base/lib/galleries/image.svelte';

  let { image }: { image: GalleryImageModel } = $props();
  let title = $derived(image.data?.name ?? '');

  let modals = getModalsContext();

  let onDelete = async () => {
    await withDeleteConfirmationModal(modals, {
      name: 'this image',
      onConfirmed: async () => {
        await image.delete();
      },
    });
  };
</script>

<Section>
  <Header {title} />
</Section>
<Section>
  <ButtonRow label="Delete image" onClick={onDelete} />
</Section>
