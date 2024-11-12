<script lang="ts">
  import Lightbox from '$dummy/components/frontend/blocks/galleries/lightbox/lightbox.svelte';
  import type { PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';
  import { GalleryPageSettingsModel } from './settings.svelte';

  let { runtime }: { runtime: PageRuntimeModel } = $props();
  let settings = $derived(runtime.settings!.pageAs<GalleryPageSettingsModel>());
  let gallery = $derived(settings.gallery);

  let innerHeight = $state<number>();
  let height = $derived.by(() => {
    if (innerHeight) {
      return innerHeight - 120;
    }
  });
</script>

<svelte:window bind:innerHeight />

<div class="page">
  {#if gallery}
    <div class="lightbox">
      <Lightbox {gallery} {height} thumbnail="2048x2048" />
    </div>
  {/if}
</div>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .lightbox {
      padding: 0 15px;
    }
  }
</style>
