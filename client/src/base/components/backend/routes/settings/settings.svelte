<script lang="ts">
  import Section from '$base/components/dark/section/section.svelte';
  import LucideUser from '$base/components/icons/lucide--user.svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<Section title="Settings" icon={LucideUser}>
  {@render children()}
</Section>
