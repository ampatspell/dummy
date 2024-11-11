<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import Layout from '$dummy/components/frontend/layout/layout.svelte';

  let {
    children,
    data,
  }: {
    children: Snippet;
    data: LayoutData;
  } = $props();

  let runtime = $derived(data.runtime);
  $effect(() => subscribe(runtime));
</script>

<Layout {runtime}>
  {@render children()}
</Layout>
