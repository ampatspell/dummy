<script lang="ts">
  import Settings from '$dummy/components/backend/routes/settings/settings.svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<Settings>
  {@render children()}
</Settings>
