<script lang="ts">
  import type { FileModel } from '$dummy/lib/assets/file.svelte';
  import Icon from '$dummy/components/dark/icon.svelte';
  import LucideFile from '$dummy/components/icons/lucide--file.svelte';
  import { formatBytes } from '$dummy/lib/utils/number';

  let { file }: { file: FileModel } = $props();

  let src = $derived(file.thumbnails?.['120x120'].url);
  let name = $derived(file.name);
</script>

<div class="image">
  {#if file.isImage}
    <div class="thumbnail" style:--url="url('{src}')"></div>
  {:else}
    <div class="placeholder">
      <Icon icon={LucideFile} />
      <div class="size">{formatBytes(file.size)}</div>
    </div>
  {/if}
  <div class="footer">
    {name}
  </div>
</div>

<style lang="scss">
  .image {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2px;
    gap: 2px;
    > .placeholder {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      font-size: 11px;
      color: var(--dark-faded-color-1);
    }
    > .thumbnail {
      flex: 1;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: var(--url);
    }
    > .footer {
      font-size: 11px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      min-width: 0;
      text-align: center;
    }
  }
</style>
