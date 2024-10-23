<script lang="ts">
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';
  import Image from './image.svelte';

  let { gallery }: { gallery: GalleryModel } = $props();

  let width = $state<number>();
  let gap = $state(5);

  let columns = $derived.by(() => {
    if (width) {
      return Math.floor(width / 150);
    }
  });

  let size = $derived.by(() => {
    if (width && columns) {
      let w = width - gap * (columns - 1);
      let size = w / columns;
      return Math.floor(size);
    }
  });

  let onclick = () => {
    gallery.runtime.clear();
  };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="grid" bind:clientWidth={width} style:--gap="{gap}px" {onclick}>
  {#if size}
    <div class="content">
      {#each gallery.images as image}
        <Image {image} {size} />
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .grid {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--gap);
    }
  }
</style>
