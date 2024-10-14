<script lang="ts">
  import '../app.scss';
  import Theme from '$lib/theme/theme.svelte';
  import type { Snippet } from 'svelte';

  let {
    children,
  }: {
    children: Snippet;
  } = $props();
</script>

<Theme>
  {@render children()}
</Theme>

