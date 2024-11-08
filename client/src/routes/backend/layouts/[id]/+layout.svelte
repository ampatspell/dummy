<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import { getter } from '$dummy/lib/utils/options';
  import { createLayoutContext } from './context.svelte';
  import Loaded from '$dummy/components/dark/section/loaded.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let context = createLayoutContext({
    id: getter(() => data.id),
  });

  $effect(() => subscribe(context.layout));

  let model = $derived(context.layout);
</script>

<Loaded {model} placeholder="Layout not found">
  {@render children()}
</Loaded>
