<script lang="ts">
  import Column from './column.svelte';
  import Row from './row.svelte';

  let {
    label,
    value,
  }: {
    label: string;
    value?: string;
  } = $props();
</script>

<Row>
  <Column {label} {value} />
</Row>
