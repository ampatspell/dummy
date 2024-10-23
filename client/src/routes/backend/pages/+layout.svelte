<script lang="ts">
  import Pages from '$base/components/backend/routes/pages/pages.svelte';
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte';
  import type { PageModel } from '$base/lib/pages/page.svelte';
  import { PagesModel } from '$base/lib/pages/pages.svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  let pages = new PagesModel({});
  $effect(() => subscribe(pages));

  let route = (page: PageModel) => `/backend/pages/${page.id}`;
</script>

<Pages {pages} {route}>
  {@render children()}
</Pages>
