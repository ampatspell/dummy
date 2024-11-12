<script lang="ts">
  import type { GalleryImageSize } from '$dummy-shared/documents';
  import type { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import type { VoidCallback } from '$dummy/lib/utils/types';

  let {
    image,
    thumbnail,
    isSelected,
    onClick,
  }: {
    image: GalleryImageModel;
    thumbnail: GalleryImageSize;
    isSelected: boolean;
    onClick: VoidCallback;
  } = $props();

  let url = $derived(image.thumbnails[thumbnail].url);
  let onclick = () => onClick();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="image" class:selected={isSelected} style:--url="url('{url}')" {onclick}></div>

<style lang="scss">
  .image {
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    background-image: var(--url);
    opacity: 0;
    transition: 0.15s ease-in-out opacity;
    &.selected {
      opacity: 1;
    }
  }
</style>
