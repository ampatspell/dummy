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

  let title = 'Folder';

  let properties = $derived(folder.properties);
  let name = $derived(properties.name);
</script>

<Section>
  <Header {title} />
</Section>
<Section>
  <InputRow label="Name" property={name} />
</Section>
