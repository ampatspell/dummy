<script lang="ts">
  import '$dummy/components/app.scss';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import Loaded from '$dummy/components/dark/loaded.svelte';
  // import Stats from '$dummy/components/dark/stats.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let model = $derived(data.site);
  $effect(() => subscribe(model));

  $effect.pre(() => {
    document.body.classList.remove('loading');
  });
</script>

<Loaded {model}>
  {@render children()}
</Loaded>

<!-- <Stats /> -->
