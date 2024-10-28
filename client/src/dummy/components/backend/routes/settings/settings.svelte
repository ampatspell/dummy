<script lang="ts">
  import Section from '$dummy/components/dark/section/section.svelte';
  import LucideUser from '$dummy/components/icons/lucide--user.svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<Section title="Settings" icon={LucideUser}>
  {@render children()}
</Section>
