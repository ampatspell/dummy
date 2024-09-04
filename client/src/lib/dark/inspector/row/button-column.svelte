<script lang="ts">
  import Button from '$lib/dark/button.svelte';
  import type { VoidCallback } from '$lib/utils/types';
  import Column from './column.svelte';

  let { label, onClick }: { label: string; onClick: VoidCallback } = $props();
</script>

<Column {label}>
  <Button {label} {onClick} />
</Column>
