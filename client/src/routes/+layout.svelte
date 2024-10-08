<script lang="ts">
  import '../app.scss';
  import Layout from '$lib/page/layout.svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutDefinition } from '$lib/page/models/layout.svelte';
  import Theme from '$lib/page/theme/theme.svelte';

  let {
    children,
  }: {
    children: Snippet;
  } = $props();

  const definition: LayoutDefinition = {
    theme: Theme,
  };
</script>

<Layout {definition}>
  {@render children()}
</Layout>
