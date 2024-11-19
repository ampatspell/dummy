<script lang="ts">
  import ButtonRow from '$dummy/components/dark/inspector/button-row.svelte';
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import ValueRow from '$dummy/components/dark/inspector/value-row.svelte';
  import { getModalsContext } from '$dummy/components/dark/modals/base/context.svelte';
  import { withDeleteConfirmationModal } from '$dummy/components/dark/modals/confirmation/models';
  import type { FileModel } from '$dummy/lib/assets/file.svelte';

  let { file }: { file: FileModel } = $props();

  let title = $derived(file.name);
  let position = $derived(file.position);

  let modals = getModalsContext();

  let onDelete = async () => {
    await withDeleteConfirmationModal(modals, {
      name: 'this file',
      onConfirmed: async () => {
        await file.delete();
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
  <ButtonRow label="Delete file" onClick={onDelete} />
</Section>
