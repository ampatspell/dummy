<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import Loaded from '$dummy/components/dark/loaded.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let model = $derived(data.layout);
  $effect(() => subscribe(model));
</script>

<Loaded {model}>
  {@render children()}
</Loaded>
