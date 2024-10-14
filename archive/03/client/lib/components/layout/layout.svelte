<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutModel } from './models/layout.svelte';

  let {
    layout,
    children,
  }: {
    layout: LayoutModel;
    children: Snippet;
  } = $props();

  let Theme = $derived(layout.theme);
</script>

<Theme>
  {@render children()}
</Theme>
