<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import { createGalleryContext } from './context.svelte';
  import { getter } from '$dummy/lib/utils/options';
  import Loaded from '$dummy/components/dark/section/loaded.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let context = createGalleryContext({
    id: getter(() => data.id),
  });

  $effect(() => subscribe(context.gallery));

  let model = $derived(context.gallery);
</script>

<Loaded {model} placeholder="Gallery not found">
  {@render children()}
</Loaded>
