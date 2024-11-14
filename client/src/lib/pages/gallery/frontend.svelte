<script lang="ts">
  import type { GalleryImageSize } from '$dummy-shared/documents';
  import Grid, { type GridOptions } from '$dummy/components/frontend/blocks/galleries/grid/grid.svelte';
  import Lightbox, { type LightboxOptions } from '$dummy/components/frontend/blocks/galleries/lightbox/lightbox.svelte';
  import type { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import type { PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';
  import { getter, options } from '$dummy/lib/utils/options';
  import { GalleryPageLayoutSettingsModel, GalleryPageSettingsModel } from './settings.svelte';

  let {
    runtime,
  }: {
    runtime: PageRuntimeModel;
  } = $props();

  let pageSettings = $derived(runtime.settings!.pageAs<GalleryPageSettingsModel>());
  let layoutSettings = $derived(runtime.settings?.layout?.settingsAs<GalleryPageLayoutSettingsModel>());

  let lightboxHeight = $derived(layoutSettings?.lightboxHeight ?? 0);
  let gallery = $derived(pageSettings.gallery);
  let images = $derived(gallery?.images);
  let thumbnail: GalleryImageSize = '2048x2048';
  let selected = $state<GalleryImageModel>();

  $effect.pre(() => {
    selected = images?.[0];
  });

  let innerHeight = $state<number>();
  let innerWidth = $state<number>(Infinity);
  let isMobile = $derived(innerWidth <= 768);

  let height = $derived.by(() => {
    if (innerHeight) {
      let base = innerHeight - lightboxHeight;
      if (isMobile) {
        return base + 20;
      }
      return base;
    }
  });

  let horizontalPadding = $derived(isMobile ? 15 : 30);

  let onSelect = (image: GalleryImageModel) => {
    selected = image;
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  let lightboxOptions: LightboxOptions = options({
    horizontalPadding: getter(() => horizontalPadding),
    captions: getter(() => pageSettings.lightboxCaptions),
    height: getter(() => height),
    thumbnail: getter(() => thumbnail),
  });

  let gridOptions: GridOptions = options({
    gap: 30,
    thumbnail: getter(() => thumbnail),
    alignment: getter(() => pageSettings.gridAlignment ?? 'center'),
    aspectRatio: getter(() => pageSettings.aspectRatio),
    captions: getter(() => pageSettings.gridCaptions),
  });
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<div class="page">
  {#if gallery}
    <div class="lightbox">
      <Lightbox {gallery} {selected} {onSelect} options={lightboxOptions} />
    </div>
    <div class="details">
      <div class="caption">
        <div class="title">{pageSettings.title}</div>
        {#if pageSettings.introduction}
          <div class="introduction">{pageSettings.introduction}</div>
        {/if}
      </div>
      <Grid {gallery} {onSelect} options={gridOptions} />
    </div>
  {/if}
</div>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 30px 0 0 0;
    @media (max-width: 768px) {
      padding: 15px 0 0 0;
    }
    > .lightbox {
      display: flex;
      flex-direction: column;
    }
    > .details {
      display: flex;
      flex-direction: column;
      gap: 30px;
      border-top: 1px solid #eee;
      padding: 30px;
      @media (max-width: 768px) {
        padding: 15px;
      }
      > .caption {
        display: flex;
        flex-direction: row;
        gap: 20px;
        > .title {
          font-weight: 600;
        }
        @media (max-width: 768px) {
          flex-direction: column;
          gap: 5px;
        }
      }
    }
  }
</style>
