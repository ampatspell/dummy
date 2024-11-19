<script lang="ts">
  import Overflow from '$dummy/components/dark/overflow.svelte';
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
  import Folder from './folder.svelte';
  import File from './file.svelte';
  import Files from './files/files.svelte';
  import type { FolderModel } from '$dummy/lib/assets/folder.svelte';

  let { gallery }: { gallery: FolderModel } = $props();

  let selected = $derived(gallery.runtime.selected);
</script>

<Overflow overflow="y">
  <Inspector>
    {#if selected.length}
      {#if selected.length > 1}
        <Files images={selected} />
      {:else}
        <File image={selected[0]} />
      {/if}
    {:else}
      <Folder {gallery} />
    {/if}
  </Inspector>
</Overflow>
