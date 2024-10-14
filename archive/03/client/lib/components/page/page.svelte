<script lang="ts">
  import { subscribe } from '$lib/firebase/fire/subscriber.svelte';
  import { isTruthy } from '$lib/utils/array';
  import { getter } from '$lib/utils/options';
  import Sidebar from '../dark/sidebar.svelte';
  import { getLayout } from '../layout/models/layout.svelte';
  import Blocks from './blocks/blocks.svelte';
  import Content from './content.svelte';
  import Inspector from './inspector/inspector.svelte';
  import { createPage } from './models/page.svelte';

  let { identifier }: { identifier: string } = $props();

  const layout = getLayout();
  const page = createPage({
    layout: getter(() => layout),
    identifier: getter(() => identifier),
  });

  $effect(() => subscribe(page));

  const title = $derived.by(() => {
    const title = page.title;
    const isEditing = page.isEditing;
    return [title, isEditing && '🔥'].filter(isTruthy).join(' ');
  });

  const isLoaded = $derived(page.isLoaded);
  const isEditing = $derived(page.isEditing);
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="page">
  {#if isLoaded}
    {#if isEditing}
      <Sidebar position="left">
        <Blocks {page} />
      </Sidebar>
    {/if}
    <div class="content">
      <Content {page} />
    </div>
    {#if isEditing}
      <Sidebar position="right">
        <Inspector {page} />
      </Sidebar>
    {/if}
  {/if}
</div>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: row;
    > .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>
