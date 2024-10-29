<script lang="ts">
  import ButtonRow from '$dummy/components/dark/inspector/button-row.svelte';
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import { getModalsContext } from '$dummy/components/dark/modals/base/context.svelte';
  import { withDeleteConfirmationModal } from '$dummy/components/dark/modals/confirmation/models';
  import type { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import { optionalNumberToStringProperty } from '$dummy/lib/utils/property-wrappers';

  let { image }: { image: GalleryImageModel } = $props();
  let title = $derived(image.data?.name ?? '');

  let properties = $derived(image.properties);
  let position = $derived(optionalNumberToStringProperty(properties.position));

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
  <InputRow label="Position" property={position} />
</Section>
<Section>
  <ButtonRow label="Delete image" onClick={onDelete} />
</Section>
