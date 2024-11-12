<script lang="ts">
  import type { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import type { VoidCallback } from '$dummy/lib/utils/types';

  let {
    image,
    onClick,
  }: {
    image: GalleryImageModel;
    onClick: VoidCallback;
  } = $props();

  let url = $derived(image.thumbnails['2048x2048'].url);
  let onclick = () => onClick();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="image" {onclick}>
  <div class="image" style:--url="url('{url}')"></div>
</div>

<style lang="scss">
  .image {
    --width: 200px;
    --height: calc(var(--width) / 3 * 2);
    > .image {
      background-repeat: no-repeat;
      background-position: top center;
      background-size: contain;
      background-image: var(--url);
      width: var(--width);
      height: var(--height);
    }
  }
</style>
