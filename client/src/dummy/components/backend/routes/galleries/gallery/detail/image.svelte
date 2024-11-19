<script lang="ts">
  import ButtonRow from '$dummy/components/dark/inspector/button-row.svelte';
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import ValueRow from '$dummy/components/dark/inspector/value-row.svelte';
  import { getModalsContext } from '$dummy/components/dark/modals/base/context.svelte';
  import { withDeleteConfirmationModal } from '$dummy/components/dark/modals/confirmation/models';
  import type { FileModel } from '$dummy/lib/assets/image.svelte';

  let { image }: { image: FileModel } = $props();
  let title = $derived(image.data?.name ?? '');

  let position = $derived(image.position);

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
  <ValueRow label="Position" value={position} />
</Section>
<Section>
  <ButtonRow label="Delete image" onClick={onDelete} />
</Section>
