<script lang="ts">
  import type { PageModel } from '$base/lib/pages/page.svelte';
  import type { HelloPageSettingsModel } from '../settings.svelte';
  import Gallery from './gallery.svelte';
  import Header from './header.svelte';

  let { page }: { page: PageModel } = $props();
  let settings = page.settings as HelloPageSettingsModel;
  let title = $derived(settings.title);
  let fontSize = $derived(settings.fontSize ?? 18);
  let imagePadding = $derived(settings.imagePadding ?? 0);
  let gallery = $derived(settings.gallery);
</script>

<div class="hello">
  <Header {title} {fontSize} />
  {#if gallery}
    <Gallery {gallery} {imagePadding} />
  {/if}
</div>

<style lang="scss">
  .hello {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
