<script lang="ts">
  import Column from './column.svelte';
  import Row from './row.svelte';

  let {
    label,
    value,
  }: {
    label: string;
    value: string | number | undefined;
  } = $props();
</script>

<Row>
  <Column {label}>
    {#if value === undefined}
      Not set
    {:else}
      {value}
    {/if}
  </Column>
</Row>
