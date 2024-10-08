<script lang="ts">
  import type { Snippet } from 'svelte';
  import Theme from './theme/theme.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<Theme>
  {@render children()}
</Theme>
