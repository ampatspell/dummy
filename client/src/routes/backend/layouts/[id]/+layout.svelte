<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import Loaded from '$dummy/components/dark/section/loaded.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let layout = $derived(data.layout);
  $effect(() => subscribe(layout));
</script>

<Loaded model={layout} placeholder="Layout not found">
  {@render children()}
</Loaded>
