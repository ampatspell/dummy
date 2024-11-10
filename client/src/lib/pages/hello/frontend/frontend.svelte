<script lang="ts">
  import { getPathContext } from '$dummy/components/frontend/path/context.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import type { HelloPageSettingsModel } from '../backend/settings.svelte';
  import Gallery from './gallery.svelte';
  import Grid from './grid.svelte';
  import Header from './header.svelte';

  let { page }: { page: PageModel } = $props();
  let settings = page.settings as HelloPageSettingsModel;
  let title = $derived(settings.title);
  let fontSize = $derived(settings.fontSize ?? 18);
  let imagePadding = $derived(settings.imagePadding ?? 0);
  let gallery = $derived(settings.gallery);

  let path = getPathContext();
  let isGrid = $derived(path.args?.[0] === 'grid');
  let toggleGridUrl = $derived.by(() => {
    if (isGrid) {
      return path.urlForArgs();
    } else {
      return path.urlForArgs(['grid']);
    }
  });
</script>

<div class="hello">
  <Header {title} {fontSize} {isGrid} {toggleGridUrl} />
  {#if gallery}
    {#if isGrid}
      <Grid {gallery} />
    {:else}
      <Gallery {gallery} {imagePadding} />
    {/if}
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
