<script lang="ts">
  import Overflow from '$dummy/components/dark/overflow.svelte';
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
  import Folder from './folder.svelte';
  import File from './file.svelte';
  import Files from './files/files.svelte';
  import type { FolderModel } from '$dummy/lib/assets/folder.svelte';

  let { folder }: { folder: FolderModel } = $props();

  let selected = $derived(folder.runtime.selected);
</script>

<Overflow overflow="y">
  <Inspector>
    {#if selected.length}
      {#if selected.length > 1}
        <Files files={selected} />
      {:else}
        <File file={selected[0]} />
      {/if}
    {:else}
      <Folder {folder} />
    {/if}
  </Inspector>
</Overflow>
