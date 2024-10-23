<script lang="ts">
  import Icon from '$base/components/dark/icon.svelte';
  import Column from '$base/components/dark/inspector/column.svelte';
  import Row from '$base/components/dark/inspector/row.svelte';
  import LucideTrash_2 from '$base/components/icons/lucide--trash-2.svelte';
  import type { GalleryImageModel } from '$base/lib/galleries/image.svelte';

  let { image }: { image: GalleryImageModel } = $props();

  let onDelete = async () => {
    await image.delete();
  };
</script>

<Row>
  <Column flex={true}>
    {image.data?.name}
  </Column>
  <Column>
    <Icon icon={LucideTrash_2} onClick={onDelete} />
  </Column>
</Row>
