<script lang="ts">
  import type { GalleryImageSize } from '$dummy-shared/documents';
  import Grid from '$dummy/components/frontend/blocks/galleries/grid/grid.svelte';
  import Lightbox from '$dummy/components/frontend/blocks/galleries/lightbox/lightbox.svelte';
  import type { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import type { PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';
  import { aspectRatioValues } from '$dummy/lib/utils/aspect-ratio';
  import { GalleryPageSettingsModel } from './settings.svelte';

  let { runtime }: { runtime: PageRuntimeModel } = $props();
  let settings = $derived(runtime.settings!.pageAs<GalleryPageSettingsModel>());
  let gallery = $derived(settings.gallery);
  let aspectRatio = $derived(aspectRatioValues[settings.aspectRatio ?? '1x1']);
  let alignment = $derived(settings.gridAlignment ?? 'center');
  let images = $derived(gallery?.images);
  let thumbnail: GalleryImageSize = '2048x2048';

  let selected = $state<GalleryImageModel>();

  $effect.pre(() => {
    selected = images?.[0];
  });

  let innerHeight = $state<number>();
  let height = $derived.by(() => {
    if (innerHeight) {
      return innerHeight - 200;
    }
  });

  let onSelect = (image: GalleryImageModel) => {
    selected = image;
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };
</script>

<svelte:window bind:innerHeight />

<div class="page">
  {#if gallery}
    <div class="lightbox">
      <Lightbox {gallery} {selected} {height} {onSelect} {thumbnail} />
    </div>
    <div class="details">
      <div class="caption">
        <div class="title">{settings.title}</div>
        {#if settings.introduction}
          <div class="introduction">{settings.introduction}</div>
        {/if}
      </div>
      <Grid {gallery} {selected} {onSelect} {thumbnail} {aspectRatio} {alignment} />
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
    > .lightbox {
      display: flex;
      flex-direction: column;
      --dummy-block-lightbox-horizontal-padding: 30px;
    }
    > .details {
      display: flex;
      flex-direction: column;
      gap: 30px;
      border-top: 1px solid #eee;
      padding: 30px;
      > .caption {
        display: flex;
        flex-direction: row;
        gap: 20px;
        > .title {
          font-weight: 600;
        }
      }
    }
  }
</style>
