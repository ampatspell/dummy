<script lang="ts">
  import Theme from '$lib/theme/theme.svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';

  let {
    children,
    data,
  }: {
    children: Snippet;
    data: LayoutData;
  } = $props();

  let path = $derived(data.path);
</script>

<Theme {path}>
  {@render children()}
</Theme>
