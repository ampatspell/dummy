<script lang="ts">
  import ButtonRow from '$dummy/components/dark/inspector/button-row.svelte';
  import Column from '$dummy/components/dark/inspector/column.svelte';
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import Row from '$dummy/components/dark/inspector/row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import { getModalsContext } from '$dummy/components/dark/modals/base/context.svelte';
  import { withDeleteConfirmationModal } from '$dummy/components/dark/modals/confirmation/models';
  import type { FileModel } from '$dummy/lib/assets/file.svelte';

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
        await Promise.all(files.map((file) => file.delete()));
      },
    });
  };

  let title = $derived(`${files.length} files selected`);
</script>

<Section>
  <Header {title} />
</Section>
<Section>
  <Row>
    <Column>
      <div class="files">
        {#each files as file}
          <div class="file">{file.name}</div>
        {/each}
      </div>
    </Column>
  </Row>
</Section>
<Section>
  <ButtonRow label="Delete selected files" onClick={onDeleteAll} />
</Section>

<style lang="scss">
  .files {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
