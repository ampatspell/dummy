<script lang="ts" module>
  export const gridAlignments = ['center', 'bottom-left', 'bottom-center'] as const;

  export type GridAlignment = (typeof gridAlignments)[number];

  export const gridAlignmentLabels: { [key in GridAlignment]: string } = {
    center: 'Center',
    'bottom-left': 'Bottom left',
    'bottom-center': 'Bottom center',
  };
</script>

<script lang="ts">
  import type { GalleryImageSize } from '$dummy-shared/documents';
  import type { GalleryModel } from '$dummy/lib/galleries/gallery.svelte';
  import { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import Image from './image.svelte';

  let {
    gallery,
    selected,
    thumbnail,
    aspectRatio,
    alignment,
    labels,
    onSelect: _onSelect,
  }: {
    gallery: GalleryModel;
    aspectRatio: number;
    alignment: GridAlignment;
    selected?: GalleryImageModel;
    thumbnail: GalleryImageSize;
    labels: boolean;
    onSelect: (image: GalleryImageModel) => void;
  } = $props();

  let onSelect = (image: GalleryImageModel) => () => _onSelect(image);

  let gap = 30;
  let gridWidth = $state<number>();
  let heightForWidth = (width: number) => width / aspectRatio;

  let numberOfColumns = $derived.by(() => {
    if (gridWidth) {
      return Math.max(2, Math.floor(gridWidth / 200));
    }
  });

  let size = $derived.by(() => {
    if (gridWidth && numberOfColumns) {
      const w = gridWidth - gap * (numberOfColumns - 1);
      const size = w / numberOfColumns;
      const width = size;
      const height = heightForWidth(width);
      return {
        width,
        height,
      };
    }
  });
</script>

{#if gallery.images.length > 0}
  <div class="grid" bind:clientWidth={gridWidth}>
    {#if size}
      <div class="images" style:--gap="{gap}px" style:--width="{size.width}px" style:--height="{size.height}px">
        {#each gallery.images as image}
          <Image {image} {thumbnail} {alignment} {labels} isSelected={image === selected} onClick={onSelect(image)} />
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  .grid {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .images {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--gap);
    }
  }
</style>
