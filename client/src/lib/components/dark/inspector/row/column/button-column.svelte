<script lang="ts">
  import Button from '$lib/components/dark/button.svelte';
  import type { VoidCallback } from '$lib/utils/types';
  import Column from './column.svelte';

  let { label, onClick }: { label: string; onClick: VoidCallback } = $props();
</script>

<Column>
  <Button {label} {onClick} />
</Column>
