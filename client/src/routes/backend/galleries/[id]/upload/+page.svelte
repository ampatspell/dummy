<script lang="ts">
  import Upload from '$base/components/backend/pages/galleries/gallery/upload/upload.svelte';
  import { getGalleryContext } from '../+layout.svelte';

  let context = getGalleryContext();
  let gallery = $derived(context.gallery);
</script>

<Upload {gallery} />
