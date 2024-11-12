<script lang="ts">
  import '$dummy/components/app.scss';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let site = $derived(data.site);
  $effect(() => subscribe(site));
</script>

{#if site.isLoaded}
  {@render children()}
{/if}
