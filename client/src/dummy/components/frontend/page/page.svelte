<script lang="ts">
  import type { PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';
  import Dark from '$dummy/components/dark/dark.svelte';
  import Placeholder from './placeholder.svelte';

  let {
    runtime,
  }: {
    runtime: PageRuntimeModel;
  } = $props();

  let isLoaded = $derived(runtime.isLoaded);
  let page = $derived(runtime.page);
  let definition = $derived(page?.definition);
  let Component = $derived(definition?.page?.frontend);

  let title = $derived.by(() => {
    if (isLoaded) {
      return page?.name ?? runtime.path;
    }
  });
</script>

<svelte:head>
  {#if title}
    <title>{title}</title>
  {/if}
</svelte:head>

{#if isLoaded}
  {#if page}
    {#if Component}
      <Component {runtime} />
    {:else}
      <Placeholder label="Page definition not found" />
    {/if}
  {:else}
    <Dark>
      <Placeholder label="Page not found" />
    </Dark>
  {/if}
{/if}
