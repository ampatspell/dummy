<script lang="ts">
  import ValueRow from './value-row.svelte';

  let { value }: { value?: string } = $props();
</script>

<ValueRow label="ID" {value} />
