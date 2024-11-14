<script lang="ts">
  import type { PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';
  import Dark from '$dummy/components/dark/dark.svelte';
  import Placeholder from './placeholder.svelte';
  import Backend from '../backend.svelte';

  let {
    runtime,
  }: {
    runtime: PageRuntimeModel;
  } = $props();

  let isLoaded = $derived(runtime.isLoaded);
  let page = $derived(runtime.page);
  let definition = $derived(page?.definition);
  let Component = $derived(definition?.page?.frontend);

  $effect(() => {
    page?.onPageView();
  });
</script>

{#if isLoaded}
  {#if page}
    {#if Component}
      <Component {runtime} />
    {:else}
      <Dark>
        <Placeholder label="Page definition not found" />
      </Dark>
    {/if}
    <Backend route="/backend/pages/{page.id}" />
  {:else}
    <Dark>
      <Placeholder label="Page not found" />
    </Dark>
    <Backend route="/backend/pages" />
  {/if}
{/if}
