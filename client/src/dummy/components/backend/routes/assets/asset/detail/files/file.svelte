<script lang="ts">
  import Column from '$dummy/components/dark/inspector/column.svelte';
  import Row from '$dummy/components/dark/inspector/row.svelte';
  import type { FileModel } from '$dummy/lib/assets/file.svelte';

  let { file }: { file: FileModel } = $props();
</script>

<Row>
  <Column>
    {file.name}
  </Column>
</Row>
