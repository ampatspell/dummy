<script lang="ts">
  import '../app.scss';
  import Layout from '$lib/page/layout.svelte';
  import type { Snippet } from 'svelte';
  import { createLayout } from '$lib/page/models/layout.svelte';
  import Theme from '$lib/page/theme/theme.svelte';

  let {
    children,
  }: {
    children: Snippet;
  } = $props();

  const layout = createLayout({
    theme: Theme,
  });
</script>

<Layout {layout}>
  {@render children()}
</Layout>
