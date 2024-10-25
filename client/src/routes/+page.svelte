<script lang="ts">
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte';
  import { buildPageByIdModel } from '$base/lib/pages/page.svelte';
  import Page from '$base/components/frontend/page.svelte';

  let id = $state('1a2UqPL1jsMOz6qI5pRs');
  let page = $derived(buildPageByIdModel({ id }));
  $effect(() => subscribe(page));
</script>

<Page {page} />
