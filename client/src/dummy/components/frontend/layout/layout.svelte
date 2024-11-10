<script lang="ts">
  import Dark from '$dummy/components/dark/dark.svelte';
  import Placeholder from '$dummy/components/dark/placeholder.svelte';
  import LucideEyeOff from '$dummy/components/icons/lucide--eye-off.svelte';
  import type { PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';
  import type { Snippet } from 'svelte';

  let {
    runtime,
    children,
  }: {
    runtime: PageRuntimeModel;
    children: Snippet;
  } = $props();

  let isLoaded = $derived(runtime.layout.isLoaded);
  let layout = $derived(runtime.layout);
  let Component = $derived(layout.definition?.frontend);
</script>

{#if isLoaded}
  {#if Component}
    <Component {runtime}>
      {@render children?.()}
    </Component>
  {:else}
    <Dark>
      <Placeholder icon={LucideEyeOff} label="No layout set" />
    </Dark>
  {/if}
{/if}
