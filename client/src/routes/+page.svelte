<script lang="ts">
  import { subscribe } from '$lib/firebase/fire/subscriber.svelte';
  import { PageModel } from '$lib/page/models/page.svelte';
  import { setGlobal } from '$lib/utils/set-global';
  import Page from '$lib/page/components/page.svelte';

  let page = new PageModel({
    identifier: 'index',
    isEditable: true,
  });

  subscribe(page);

  $effect(() => setGlobal({ page }));
</script>

<svelte:head>
  {#if page.title}
    <title>{page.title} (Dummy)</title>
  {/if}
</svelte:head>

{#if page.isLoaded}
  <Page {page} />
{/if}
