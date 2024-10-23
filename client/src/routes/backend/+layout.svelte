<script lang="ts">
  import Layout from '$base/components/backend/layout/layout.svelte';
  import Dark from '$base/components/dark/dark.svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
  let route = $derived(data.route);
</script>

<Dark>
  <Layout {route}>
    {@render children()}
  </Layout>
</Dark>
