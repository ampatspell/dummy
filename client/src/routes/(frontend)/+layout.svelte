<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let layout = $derived(data.layout);
  $effect(() => subscribe(layout));
</script>

{#if layout.isLoaded}
  {@render children()}
{/if}
