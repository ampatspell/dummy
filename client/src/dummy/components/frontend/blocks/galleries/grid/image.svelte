<script lang="ts">
  import type { GalleryImageSize } from '$dummy-shared/documents';
  import type { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import { classes } from '$dummy/lib/utils/classes';
  import type { VoidCallback } from '$dummy/lib/utils/types';
  import type { GridAlignment } from './grid.svelte';

  let {
    image,
    thumbnail,
    alignment,
    captions,
    onClick,
  }: {
    image: GalleryImageModel;
    thumbnail: GalleryImageSize;
    alignment: GridAlignment;
    captions: boolean;
    isSelected: boolean;
    onClick: VoidCallback;
  } = $props();

  let hash = $derived(image.thumbnails[thumbnail]);
  let url = $derived(hash.url);
  let onclick = () => onClick();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={classes('image', `alignment-${alignment}`)} {onclick}>
  <div class="content" style:--url="url('{url}')"></div>
  {#if captions}
    <div class="caption">{image.name}</div>
  {/if}
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
      opacity: 0.8;
    }
    &.alignment-center {
      > .content {
        background-position: center center;
      }
    }
    &.alignment-bottom-left {
      > .content {
        background-position: bottom left;
      }
    }
    &.alignment-bottom-center {
      > .content {
        background-position: bottom center;
      }
    }
  }
</style>
