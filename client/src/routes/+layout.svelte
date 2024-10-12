<script lang="ts">
  import '../app.scss';
  import Layout from '$lib/components/layout/layout.svelte';
  import type { Snippet } from 'svelte';
  import { createLayout } from '$lib/components/layout/models/layout.svelte';
  import Theme from '$lib/components/theme/theme.svelte';
  import Hamster from '$lib/components/theme/blocks/hamster.svelte';

  let {
    children,
  }: {
    children: Snippet;
  } = $props();

  const layout = createLayout({
    theme: Theme,
    blocks: [
      {
        id: 'hamster',
        component: Hamster,
        props: {
          greeting: {
            type: 'string',
            optional: true,
          },
        },
      },
    ],
  });
</script>

<Layout {layout}>
  {@render children()}
</Layout>
