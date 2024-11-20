<script lang="ts">
  import Overflow from '$dummy/components/dark/overflow.svelte';
  import type { FolderModel } from '$dummy/lib/assets/folder.svelte';
  import FolderGrid from '$dummy/components/backend/assets/grid/folder-grid.svelte';

  let { folder }: { folder: FolderModel } = $props();
</script>

<Overflow overflow="y">
  <div class="master">
    <FolderGrid {folder} />
  </div>
</Overflow>

<style lang="scss">
  .master {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
</style>
