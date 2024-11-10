<script lang="ts">
  import Dark from '$dummy/components/dark/dark.svelte';
  import Placeholder from '$dummy/components/dark/placeholder.svelte';
  import LucideNotebookText from '$dummy/components/icons/lucide--notebook-text.svelte';

  let { label }: { label: string } = $props();
</script>

<Dark>
  <Placeholder icon={LucideNotebookText} {label} />
</Dark>
