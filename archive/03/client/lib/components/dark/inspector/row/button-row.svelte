<script lang="ts">
  import type { VoidCallback } from '$lib/utils/types';
  import ButtonColumn from './column/button-column.svelte';
  import Row from './row.svelte';

  let { label, onClick }: { label: string; onClick: VoidCallback } = $props();
</script>

<Row>
  <ButtonColumn {label} {onClick} />
</Row>
