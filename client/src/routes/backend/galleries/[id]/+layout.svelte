<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte';
  import { createGalleryContext } from './context.svelte';
  import { getter } from '$base/lib/utils/options';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let context = createGalleryContext({
    id: getter(() => data.id),
  });

  $effect(() => subscribe(context.gallery));

  let isLoaded = $derived(context.gallery);
</script>

{#if isLoaded}
  {@render children()}
{/if}
