<script lang="ts">
  import { goto } from '$app/navigation';
  import Gallery from '$base/components/backend/routes/galleries/gallery/gallery.svelte';
  import { getGalleryContext } from './context.svelte';

  let context = getGalleryContext();
  let gallery = $derived(context.gallery);

  let onWillDelete = () => {
    goto('/backend/galleries');
  };
</script>

<Gallery {gallery} {onWillDelete} />
