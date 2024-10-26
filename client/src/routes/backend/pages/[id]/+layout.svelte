<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte';
  import { getter } from '$base/lib/utils/options';
  import { createPageContext } from './context.svelte';
  import Loaded from '$base/components/dark/section/loaded.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let context = createPageContext({
    id: getter(() => data.id),
  });

  $effect(() => subscribe(context.page));

  let model = $derived(context.page);
</script>

<Loaded {model} placeholder="Page not found">
  {@render children()}
</Loaded>
