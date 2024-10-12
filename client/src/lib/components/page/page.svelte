<script lang="ts">
  import { subscribe } from '$lib/firebase/fire/subscriber.svelte';
  import { isTruthy } from '$lib/utils/array';
  import { getter } from '$lib/utils/options';
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
      <div class="blocks">
        <Blocks {page} />
      </div>
    {/if}
    <div class="content">
      <Content {page} />
    </div>
    {#if isEditing}
      <div class="inspector">
        <Inspector {page} />
      </div>
    {/if}
  {/if}
</div>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: row;
    > .blocks {
      border-right: 1px solid var(--dark-border-color-1);
      display: flex;
      flex-direction: column;
    }
    > .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    > .inspector {
      border-left: 1px solid var(--dark-border-color-1);
      display: flex;
      flex-direction: column;
    }
  }
</style>
