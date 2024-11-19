<script lang="ts">
  import ButtonRow from '$dummy/components/dark/inspector/button-row.svelte';
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import { getModalsContext } from '$dummy/components/dark/modals/base/context.svelte';
  import { withDeleteConfirmationModal } from '$dummy/components/dark/modals/confirmation/models';
  import type { FileModel } from '$dummy/lib/assets/file.svelte';
  import File from './file.svelte';

  let {
    files,
  }: {
    files: FileModel[];
  } = $props();

  let modals = getModalsContext();

  let onDeleteAll = async () => {
    await withDeleteConfirmationModal(modals, {
      name: 'selected files',
      onConfirmed: async () => {
        await Promise.all(files.map((image) => image.delete()));
      },
    });
  };

  let title = $derived(`${files.length} files selected`);
</script>

<Section>
  <Header {title} />
</Section>
<Section>
  {#each files as file}
    <File {file} />
  {/each}
</Section>
<Section>
  <ButtonRow label="Delete selected images" onClick={onDeleteAll} />
</Section>
