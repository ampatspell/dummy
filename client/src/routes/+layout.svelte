<script lang="ts">
  import '$dummy/components/app.scss';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

{@render children()}
