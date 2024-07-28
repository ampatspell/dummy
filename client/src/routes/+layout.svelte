<script lang="ts">
  import '../app.scss';
  import Layout from '$lib/layout.svelte';
  import type { Snippet } from 'svelte';

  let {
    children,
  }: {
    children: Snippet;
  } = $props();
</script>

<Layout>
  {@render children()}
</Layout>
