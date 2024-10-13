<script lang="ts">
  import '../app.scss';
  import Layout from '$lib/components/layout/layout.svelte';
  import type { Snippet } from 'svelte';
  import { createLayout } from '$lib/components/layout/models/layout.svelte';
  import { definition } from './definition.svelte';

  let {
    children,
  }: {
    children: Snippet;
  } = $props();

  const layout = createLayout(definition);
</script>

<Layout {layout}>
  {@render children()}
</Layout>
