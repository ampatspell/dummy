<script lang="ts">
  import Icon from '$base/components/dark/icon.svelte';
  import LucideFlame from '$base/components/icons/lucide--flame.svelte';
  import type { PageModel } from '$base/lib/pages/page.svelte';
  import type { HelloPageSettingsModel } from './settings.svelte';

  let { page }: { page: PageModel } = $props();
  let settings = page.settings as HelloPageSettingsModel;
  let fontSize = $derived(settings.fontSize ?? 18);
  let imagePadding = $derived(settings.imagePadding ?? 0);

  let gallery = $derived.by(() => {
    let gallery = settings.gallery;
    if (gallery?.exists) {
      return gallery;
    }
  });
</script>

<div class="hello">
  <div class="header">
    <div class="content">
      <Icon icon={LucideFlame} size="large" />
      <div class="title" style:--font-size="{fontSize}px">
        {settings.title}
      </div>
    </div>
  </div>
  {#if gallery}
    <div class="gallery" style:--image-padding="{imagePadding}px">
      {#each gallery.images as image}
        <div class="image">
          <!-- svelte-ignore a11y_missing_attribute -->
          <img src={image.thumbnails['2048x2048'].url} />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .hello {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    > .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      > .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 50px;
        > .title {
          font-size: var(--font-size);
        }
      }
    }
    > .gallery {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;
      > .image {
        max-width: 2048px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        > img {
          display: block;
          width: calc(100% - var(--image-padding));
          height: calc(100% - var(--image-padding));
          object-fit: contain;
        }
      }
    }
  }
</style>
