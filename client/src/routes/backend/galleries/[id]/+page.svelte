<script lang="ts">
  import { goto } from '$app/navigation';
  import Gallery from '$base/components/backend/pages/galleries/gallery/gallery.svelte';
  import { getGalleryContext } from './context.svelte';

  let context = getGalleryContext();
  let gallery = $derived(context.gallery);

  let onWillDelete = () => {
    goto('/backend/galleries');
  };

  let onUpload = $derived(`/backend/galleries/${gallery.id}/upload`);
</script>

<Gallery {gallery} {onWillDelete} {onUpload} />
