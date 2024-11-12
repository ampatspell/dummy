<script lang="ts">
  import type { GalleryImageSize } from '$dummy-shared/documents';
  import Grid from '$dummy/components/frontend/blocks/galleries/grid/grid.svelte';
  import Lightbox from '$dummy/components/frontend/blocks/galleries/lightbox/lightbox.svelte';
  import type { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import type { PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';
  import { GalleryPageSettingsModel } from './settings.svelte';

  let { runtime }: { runtime: PageRuntimeModel } = $props();
  let settings = $derived(runtime.settings!.pageAs<GalleryPageSettingsModel>());
  let gallery = $derived(settings.gallery);
  let images = $derived(gallery?.images);

  let selected = $state<GalleryImageModel>();

  $effect.pre(() => {
    selected = images?.[0];
  });

  let innerHeight = $state<number>();
  let height = $derived.by(() => {
    if (innerHeight) {
      return innerHeight - 220;
    }
  });

  let onClick = (image: GalleryImageModel) => {
    selected = image;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
</script>

<svelte:window bind:innerHeight />

<div class="page">
  {#if gallery}
    <div class="lightbox">
      <Lightbox {gallery} {selected} {height} {onClick} thumbnail="2048x2048" />
    </div>
    <div class="details">
      <div class="title">{settings.title}</div>
      <Grid {gallery} {onClick} />
    </div>
  {/if}
</div>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 30px;
    > .lightbox {
      padding: 15px;
    }
    > .details {
      display: flex;
      flex-direction: column;
      gap: 30px;
      border-top: 1px solid #eee;
      padding: 30px;
      > .title {
        font-weight: 600;
      }
    }
  }
</style>
