<script lang="ts">
  import Layout from '$base/components/backend/layout/layout.svelte';
  import Dark from '$base/components/dark/dark.svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import Modals from '$base/components/dark/modals/base/modals.svelte';
  import { createModalsContext } from '$base/components/dark/modals/base/context.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
  let route = $derived(data.route);

  createModalsContext();
</script>

<svelte:head>
  <title>dummy</title>
</svelte:head>

<Dark>
  <Layout {route}>
    {@render children()}
  </Layout>
  <Modals />
</Dark>
