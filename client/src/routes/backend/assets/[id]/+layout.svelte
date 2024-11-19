<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import Loaded from '$dummy/components/dark/section/loaded.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let gallery = $derived(data.gallery);
  $effect(() => subscribe(gallery));
</script>

<Loaded model={gallery} placeholder="Gallery not found">
  {@render children()}
</Loaded>
