<script lang="ts" module>
  import type { AssetsImageSize } from '$dummy-shared/documents';
  import type { FileModel } from '$dummy/lib/assets/file.svelte';
  import type { FolderModel } from '$dummy/lib/assets/folder.svelte';

  export const gridAlignments = ['center', 'bottom-left', 'bottom-center'] as const;

  export type GridAlignment = (typeof gridAlignments)[number];

  export const gridAlignmentLabels: { [key in GridAlignment]: string } = {
    center: 'Center',
    'bottom-left': 'Bottom left',
    'bottom-center': 'Bottom center',
  };

  export type GridOptions = {
    gap: number;
    alignment: GridAlignment;
    aspectRatio: number;
    captions: boolean;
    thumbnail: AssetsImageSize;
  };
</script>

<script lang="ts">
  import Image from './-image.svelte';

  let {
    folder,
    options,
    onSelect: _onSelect,
  }: {
    folder: FolderModel;
    options: GridOptions;
    onSelect: (image: FileModel) => void;
  } = $props();

  let gap = $derived(options.gap);
  let gridWidth = $state<number>();

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
      const height = width / options.aspectRatio;
      return {
        width,
        height,
      };
    }
  });

  let onSelect = (image: FileModel) => () => _onSelect(image);
</script>

{#if folder.images.length > 0}
  <div class="grid" bind:clientWidth={gridWidth}>
    {#if size}
      <div class="images" style:--gap="{gap}px" style:--width="{size.width}px" style:--height="{size.height}px">
        {#each folder.images as image}
          <Image {image} {options} onClick={onSelect(image)} />
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
