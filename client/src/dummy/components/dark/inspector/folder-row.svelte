<script lang="ts">
  import type { FoldersModel } from '$dummy/lib/assets/folders.svelte';
  import type { Property } from '$dummy/lib/utils/property.svelte';
  import Dropdown from '../dropdown/dropdown.svelte';
  import Item from '../dropdown/item.svelte';
  import Column from './column.svelte';
  import Row from './row.svelte';

  let {
    label,
    property,
    folders,
  }: {
    label: string;
    property: Property<string | undefined>;
    folders: FoldersModel;
  } = $props();
  import type { FolderBaseModel } from '$dummy/lib/assets/folder.svelte';

  let selected = $derived(folders.all.find((folder) => folder.id === property.value));
  let items = $derived(folders.all);
  let onSelect = (folder?: FolderBaseModel) => property.update(folder?.id);
</script>

{#snippet item(folder?: FolderBaseModel, isSelected?: boolean)}
  <Item {isSelected}>
    {#if folder}
      {folder.name}
    {:else}
      Folder not selected
    {/if}
  </Item>
{/snippet}

{#if folders.isLoaded}
  <Row>
    <Column {label} flex={true}>
      <Dropdown {selected} {items} {onSelect} {item} />
    </Column>
  </Row>
{/if}
