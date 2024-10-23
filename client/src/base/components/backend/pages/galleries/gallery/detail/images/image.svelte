<script lang="ts">
  import Column from '$base/components/dark/inspector/column.svelte';
  import Row from '$base/components/dark/inspector/row.svelte';
  import type { GalleryImageModel } from '$base/lib/galleries/image.svelte';

  let { image }: { image: GalleryImageModel } = $props();

  let onDelete = async () => {
    await image.delete();
  };
</script>

<Row>
  <Column>
    {image.data?.name}
  </Column>
</Row>
