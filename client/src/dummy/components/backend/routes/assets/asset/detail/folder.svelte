<script lang="ts">
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import type { FolderModel } from '$dummy/lib/assets/folder.svelte';

  let {
    folder,
  }: {
    folder: FolderModel;
  } = $props();
  import ButtonRow from '$dummy/components/dark/inspector/button-row.svelte';

  let title = 'Folder';

  let properties = $derived(folder.properties);
  let name = $derived(properties.name);
  let onSelectAll = () => folder.runtime.selectAll();
</script>

<Section>
  <Header {title} />
</Section>
<Section>
  <InputRow label="Name" property={name} />
</Section>
<Section>
  <ButtonRow label="Select all" onClick={onSelectAll} />
</Section>
