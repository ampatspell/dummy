<script lang="ts">
  import type { GalleryImageModel } from '$dummy/lib/assets/image.svelte';
  import { fit } from '$dummy/lib/utils/number';
  import type { Size } from '$dummy/lib/utils/types';
  import type { LightboxOptions } from './lightbox.svelte';

  let {
    image,
    isSelected,
    options,
  }: {
    image: GalleryImageModel;
    isSelected: boolean;
    options: LightboxOptions;
  } = $props();

  let thumbnail = $derived(image.thumbnails?.[options.thumbnail]);
  let captions = $derived(options.captions);
  let url = $derived(thumbnail?.url);

  let caption = $derived(captions ? 25 : 0);
  let content = $state<Size>({ width: 0, height: 0 });
  let size = $derived.by(() => {
    if (thumbnail) {
      let { width, height } = content;
      let image = {
        width,
        height: height - caption,
      };
      return fit(image, thumbnail.size);
    }
  });
</script>

<div
  class="image"
  class:selected={isSelected}
  bind:clientWidth={content.width}
  bind:clientHeight={content.height}
  style:--url="url('{url}')"
  style:--width="{size?.width}px"
  style:--height="{size?.height}px"
>
  <div class="column">
    <div class="content"></div>
    {#if captions}
      <div class="caption">{image.name}</div>
    {/if}
  </div>
</div>

<style lang="scss">
  .image {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: 0.15s ease-in-out opacity;
    > .column {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: var(--width);
      gap: 10px;
      > .content {
        width: var(--width);
        height: var(--height);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        background-image: var(--url);
      }
      > .caption {
        font-size: 11px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    pointer-events: none;
    &.selected {
      opacity: 1;
      pointer-events: auto;
    }
  }
</style>
