<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte';
  import { getter } from '$base/lib/utils/options';
  import { createPageContext } from './context.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let context = createPageContext({
    id: getter(() => data.id),
  });

  $effect(() => subscribe(context.page));

  let isLoaded = $derived(context.page);
</script>

{#if isLoaded}
  {@render children()}
{/if}
