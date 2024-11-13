<script lang="ts">
  import type { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import type { VoidCallback } from '$dummy/lib/utils/types';

  let {
    image,
    isSelected,
    onClick,
  }: {
    image: GalleryImageModel;
    isSelected: boolean;
    onClick: VoidCallback;
  } = $props();

  let url = $derived(image.thumbnails['2048x2048'].url);
  let onclick = () => onClick();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="image" class:selected={isSelected} {onclick}>
  <div class="content" style:--url="url('{url}')"></div>
  <div class="caption">{image.name}</div>
</div>

<style lang="scss">
  .image {
    display: flex;
    flex-direction: column;
    gap: 3px;
    transition: 0.15s ease-in-out opacity;
    > .content {
      background-repeat: no-repeat;
      background-position: top center;
      background-size: contain;
      background-image: var(--url);
      width: var(--width);
      height: var(--height);
    }
    > .caption {
      font-size: 11px;
    }
    &:hover,
    &.selected {
      opacity: 0.5;
    }
  }
</style>
