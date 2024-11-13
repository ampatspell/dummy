<script lang="ts">
  import type { GalleryImageSize } from '$dummy-shared/documents';
  import type { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import type { VoidCallback } from '$dummy/lib/utils/types';

  let {
    image,
    thumbnail,
    onClick,
  }: {
    image: GalleryImageModel;
    thumbnail: GalleryImageSize;
    isSelected: boolean;
    onClick: VoidCallback;
  } = $props();

  let hash = $derived(image.thumbnails[thumbnail]);
  let url = $derived(hash.url);
  let onclick = () => onClick();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="image" {onclick}>
  <div class="content" style:--url="url('{url}')"></div>
  <div class="caption">{image.name}</div>
</div>

<style lang="scss">
  .image {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
    transition: 0.15s ease-in-out opacity;
    width: var(--width);
    > .content {
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
      background-image: var(--url);
      height: var(--height);
    }
    > .caption {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 11px;
    }
    &:hover {
      opacity: 0.5;
    }
  }
</style>
