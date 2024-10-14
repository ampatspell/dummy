<script lang="ts">
  import Layout from '$base/components/backend/layout/layout.svelte';
  import Dark from '$base/components/dark/dark.svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<Dark>
  <Layout>
    {@render children()}
  </Layout>
</Dark>
