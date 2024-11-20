<script lang="ts">
  import type { FoldersModel } from '$dummy/lib/assets/folders.svelte';
  import { optionalTransform, type Property } from '$dummy/lib/utils/property.svelte';
  import type { FolderBaseModel } from '$dummy/lib/assets/folder.svelte';
  import DropdownRow from './dropdown-row.svelte';

  let {
    label,
    property: _property,
    folders,
  }: {
    label: string;
    property: Property<string | undefined>;
    folders: FoldersModel;
  } = $props();

  let items = $derived(folders.all);

  let routeFor = (folder: FolderBaseModel) => `/backend/assets/${folder.id}`;
  let property = optionalTransform<string, FolderBaseModel>(_property, {
    toSource: (value) => value.id,
    toTarget: (value) => items.find((item) => item.id === value),
  });
</script>

{#snippet item(value: FolderBaseModel)}
  {value.name}
{/snippet}

{#if folders.isLoaded}
  <DropdownRow {label} {property} {items} {item} {routeFor} />
{/if}
