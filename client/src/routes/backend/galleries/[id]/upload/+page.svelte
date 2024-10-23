<script lang="ts">
  import Upload from '$base/components/backend/routes/galleries/gallery/upload/upload.svelte';
  import { getGalleryContext } from '../context.svelte';

  let context = getGalleryContext();
  let gallery = $derived(context.gallery);
</script>

<Upload {gallery} />
