<script lang="ts">
  import Column from '$dummy/components/dark/inspector/column.svelte';
  import Row from '$dummy/components/dark/inspector/row.svelte';
  import type { FileModel } from '$dummy/lib/assets/image.svelte';

  let { image }: { image: FileModel } = $props();
</script>

<Row>
  <Column>
    {image.name}
  </Column>
</Row>
