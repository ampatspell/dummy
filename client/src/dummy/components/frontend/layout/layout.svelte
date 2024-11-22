<script lang="ts">
  import Dark from '$dummy/components/dark/dark.svelte';
  import Placeholder from '$dummy/components/dark/placeholder.svelte';
  import LucideEyeOff from '$dummy/components/icons/lucide--eye-off.svelte';
  import type { PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';
  import type { Snippet } from 'svelte';
  import Backend from '../backend.svelte';
  import Loaded from '$dummy/components/dark/loaded.svelte';

  let {
    runtime,
    children,
  }: {
    runtime: PageRuntimeModel;
    children: Snippet;
  } = $props();

  let layout = $derived(runtime.layout);
  let Component = $derived(layout.definition?.frontend);
</script>

<Loaded model={layout}>
  {#if Component}
    <Component {runtime}>
      {@render children?.()}
    </Component>
  {:else}
    <Dark>
      <Placeholder icon={LucideEyeOff} label="Layout not set" />
    </Dark>
    <Backend route="/backend/layouts" />
  {/if}
</Loaded>
