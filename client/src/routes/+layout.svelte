<script lang="ts">
  import '$dummy/components/app.scss';
  import Theme from '$lib/theme/theme.svelte';
  import type { Snippet } from 'svelte';
  import { createThemePageDefinitions } from '$lib/pages/definition.svelte';

  createThemePageDefinitions();

  let {
    children,
  }: {
    children: Snippet;
  } = $props();
</script>

<Theme>
  {@render children()}
</Theme>
