<script lang="ts">
  import type { VoidCallback } from '$lib/utils/types';
  import Button from '../../../button.svelte';
  import Column from './column.svelte';

  let { label, onClick }: { label: string; onClick: VoidCallback } = $props();
</script>

<Column>
  <Button {label} {onClick} />
</Column>
