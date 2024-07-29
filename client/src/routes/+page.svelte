<script lang="ts">
  import { subscribe } from '$lib/firebase/fire/subscriber.svelte';
  import { PageModel } from '$lib/page/models/page.svelte';
  import { setGlobal } from '$lib/utils/set-global';
  import Page from '$lib/page/components/page.svelte';

  let page = new PageModel({
    identifier: 'index',
  });

  subscribe(page);

  $effect(() => setGlobal({ page }));
</script>

<svelte:head>
  {#if page.title}
    <title>Dummy → {page.title}</title>
  {/if}
</svelte:head>

<Page {page} />
