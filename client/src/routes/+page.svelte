<script lang="ts">
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte';
  import { buildPageByIdModel } from '$base/lib/pages/page.svelte';
  import Page from '$base/components/frontend/page.svelte';
  import { setGlobal } from '$base/lib/utils/set-global';

  let id = $state('NjyKMeH9VKjRaHJGy4UG');
  let page = $derived(buildPageByIdModel({ id }));
  $effect(() => subscribe(page));
</script>

<Page {page} />
