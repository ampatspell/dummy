<script lang="ts">
  import '../app.scss';
  import Layout from '$lib/layout/layout.svelte';
  import type { Snippet } from 'svelte';
  import type { Document, GalleryData } from '$lib/types';

  let {
    data,
    children,
  }: {
    data: {
      galleries: Document<GalleryData>[];
    };
    children: Snippet;
  } = $props();

  let galleries = $derived(data.galleries);
</script>

<Layout {galleries}>
  {@render children()}
</Layout>
