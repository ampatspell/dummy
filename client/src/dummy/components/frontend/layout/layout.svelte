<script lang="ts">
  import Dark from '$dummy/components/dark/dark.svelte';
  import Placeholder from '$dummy/components/dark/placeholder.svelte';
  import LucideEyeOff from '$dummy/components/icons/lucide--eye-off.svelte';
  import type { PathWithArgs } from '$dummy/lib/pages/path.svelte';
  import type { SiteModel } from '$dummy/lib/site/site.svelte';
  import type { Snippet } from 'svelte';

  let {
    site,
    path,
    children,
  }: {
    site: SiteModel;
    path: PathWithArgs | undefined;
    children: Snippet;
  } = $props();

  let isLoaded = $derived(site.isLoaded);
  let layout = $derived(site.layout);
  let Component = $derived(layout?.definition?.frontend);
</script>

{#if isLoaded}
  {#if layout}
    <Component {layout} {path}>
      {@render children?.()}
    </Component>
  {:else}
    <Dark>
      <Placeholder icon={LucideEyeOff} label="No layout set" />
    </Dark>
  {/if}
{/if}
