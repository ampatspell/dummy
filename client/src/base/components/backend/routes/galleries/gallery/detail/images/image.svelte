<script lang="ts">
  import Column from '$base/components/dark/inspector/column.svelte';
  import Row from '$base/components/dark/inspector/row.svelte';
  import type { GalleryImageModel } from '$base/lib/galleries/image.svelte';

  let { image }: { image: GalleryImageModel } = $props();
</script>

<Row>
  <Column>
    {image.name}
  </Column>
</Row>
