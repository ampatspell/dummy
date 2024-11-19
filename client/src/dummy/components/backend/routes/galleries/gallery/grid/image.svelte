<script lang="ts">
  import type { FileModel } from '$dummy/lib/assets/image.svelte';

  let { image }: { image: FileModel } = $props();

  let src = $derived(image.thumbnails?.['120x120'].url);
  let name = $derived(image.name);
</script>

<div class="image">
  <div class="thumbnail" style:--url="url('{src}')"></div>
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
