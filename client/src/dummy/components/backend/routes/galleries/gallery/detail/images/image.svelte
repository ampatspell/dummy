<script lang="ts">
  import Column from '$dummy/components/dark/inspector/column.svelte';
  import Row from '$dummy/components/dark/inspector/row.svelte';
  import type { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';

  let { image }: { image: GalleryImageModel } = $props();
</script>

<Row>
  <Column>
    {image.name}
  </Column>
</Row>
