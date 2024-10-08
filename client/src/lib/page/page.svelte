<script lang="ts">
  import { subscribe } from "$lib/firebase/fire/subscriber.svelte";
  import { setGlobal } from "$lib/utils/set-global";
  import { getLayout } from "./models/layout.svelte";
  import { createPage, type PageModel } from "./models/page.svelte";

  let { identifier }: { identifier: string } = $props();

  const layout = getLayout();
  const page = createPage({ layout, identifier });
  $effect(() => subscribe(page));

  $effect(() => setGlobal({ page }));
</script>

<svelte:head>
  <title>{page.title} (dummy)</title>
</svelte:head>

{#if page.isLoaded}
  <div class="page">Page "{page.identifier}" ({page.id})</div>
{/if}

<style lang="scss">
</style>
