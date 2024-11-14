<script lang="ts">
  import Settings from '$dummy/components/backend/routes/settings/settings.svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let route = $derived(data.route);
</script>

<Settings {route}>
  {@render children()}
</Settings>
