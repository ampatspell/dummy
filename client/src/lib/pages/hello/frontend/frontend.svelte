<script lang="ts">
  import type { PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';
  import type { HelloPageSettingsModel } from '../backend/settings.svelte';
  import type { HelloPageLayoutSettingsModel } from '../layout/settings.svelte';
  import Gallery from './gallery.svelte';
  import Grid from './grid.svelte';
  import Header from './header.svelte';

  let { runtime }: { runtime: PageRuntimeModel } = $props();

  let layout = $derived(runtime.settings.layout?.settingsAs<HelloPageLayoutSettingsModel>());
  let settings = $derived(runtime.settings.pageAs<HelloPageSettingsModel>());

  let title = $derived(settings.title);
  let fontSize = $derived(layout?.fontSize ?? 18);
  let imagePadding = $derived(settings.imagePadding ?? 0);
  let gallery = $derived(settings._gallery);

  let isGrid = $derived(runtime.args[0] === 'grid');
  let toggleGridUrl = $derived.by(() => {
    if (isGrid) {
      return runtime.urlForArgs();
    } else {
      return runtime.urlForArgs('grid');
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
