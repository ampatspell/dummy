<script lang="ts">
  import { subscribe } from '$lib/firebase/fire/subscriber.svelte';
  import { setGlobal } from '$lib/utils/set-global';
  import Block from './block.svelte';
  import { getLayout } from './models/layout.svelte';
  import { createPage } from './models/page.svelte';

  let { identifier }: { identifier: string } = $props();

  const layout = getLayout();
  const page = createPage({ layout, identifier });
  $effect(() => subscribe(page));

  let block = $derived(page.block);

  $effect(() => setGlobal({ page }));
</script>

<svelte:head>
  <title>{page.title} (dummy)</title>
</svelte:head>

{#if page.isLoaded}
  {#if block}
    <Block {block} />
  {:else}
    No root block for {page}
  {/if}
{/if}

<style lang="scss">
</style>
