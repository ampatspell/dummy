<script lang="ts">
  import { subscribe } from '$lib/firebase/fire/subscriber.svelte';
  import { isTruthy } from '$lib/utils/array';
  import { getter } from '$lib/utils/options';
  import Block from './block.svelte';
  import { getLayout } from './models/layout.svelte';
  import { createPage } from './models/page.svelte';

  let { identifier }: { identifier: string } = $props();

  const layout = getLayout();
  const page = createPage({
    layout: getter(() => layout),
    identifier: getter(() => identifier),
  });

  $effect(() => subscribe(page));

  const block = $derived(page.block);

  const title = $derived.by(() => {
    const title = page.title;
    const isEditing = page.isEditing;
    return [title, isEditing && '(editing)'].filter(isTruthy).join(' ');
  });
</script>

<svelte:head>
  <title>{title}</title>
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
