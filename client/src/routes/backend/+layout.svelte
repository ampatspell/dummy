<script lang="ts">
  import Layout from '$dummy/components/backend/layout/layout.svelte';
  import Dark from '$dummy/components/dark/dark.svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import Modals from '$dummy/components/dark/modals/base/modals.svelte';
  import { createModalsContext } from '$dummy/components/dark/modals/base/context.svelte';
  import { getSiteDefinition } from '$dummy/lib/definition/definition.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
  let route = $derived(data.route);

  let name = $derived(getSiteDefinition().name);

  createModalsContext();
</script>

<svelte:head>
  <title>{name}</title>
</svelte:head>

<Dark>
  <Layout {route}>
    {@render children()}
  </Layout>
  <Modals />
</Dark>
