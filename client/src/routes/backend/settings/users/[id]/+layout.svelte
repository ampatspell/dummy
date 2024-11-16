<script lang="ts">
  import Loaded from '$dummy/components/dark/section/loaded.svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
  let model = $derived(data.user);
  $effect(() => subscribe(model));
</script>

<Loaded {model} placeholder="User not found">
  {@render children()}
</Loaded>
