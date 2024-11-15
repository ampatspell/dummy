<script lang="ts">
  import Pages from '$dummy/components/backend/routes/pages/pages.svelte';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import type { PageBaseModel } from '$dummy/lib/pages/page.svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let id = $derived(data.id);
  let pages = $derived(data.pages);
  $effect(() => subscribe(pages));

  let route = (page: PageBaseModel) => `/backend/pages/${page.id}`;
</script>

<Pages {id} {pages} {route}>
  {@render children()}
</Pages>
