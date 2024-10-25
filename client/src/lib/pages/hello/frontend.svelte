<script lang="ts">
  import Icon from '$base/components/dark/icon.svelte';
  import LucideFlame from '$base/components/icons/lucide--flame.svelte';
  import type { PageModel } from '$base/lib/pages/page.svelte';
  import type { HelloPageSettingsModel } from './settings.svelte';

  let { page }: { page: PageModel } = $props();
  let settings = page.settings as HelloPageSettingsModel;
  let fontSize = $derived(settings.fontSize ?? 18);

  let gallery = $derived.by(() => {
    let gallery = settings.gallery;
    if (gallery?.exists) {
      return gallery;
    }
  });
</script>

<div class="hello">
  <div class="content">
    <Icon icon={LucideFlame} size="large" />
    <div class="title" style:--font-size="{fontSize}px">
      {settings.title}
    </div>
    {#if gallery}
      <div class="gallery">
        {#each gallery.images as image}
          <!-- svelte-ignore a11y_missing_attribute -->
          <img src={image.thumbnails['120x120'].url} />
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .hello {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      > .title {
        font-size: var(--font-size);
      }
      > .gallery {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        gap: 5px;
      }
    }
  }
</style>
