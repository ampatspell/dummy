<script lang="ts">
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte.js';
  import { buildGalleryByIdModel } from '$base/lib/galleries/gallery.svelte.js';
  import { goto } from '$app/navigation';
  import Gallery from '$base/components/backend/pages/galleries/gallery/gallery.svelte';

  let { data } = $props();

  let gallery = $derived(buildGalleryByIdModel({ id: data.id }));
  $effect(() => subscribe(gallery));

  let onWillDelete = () => {
    goto('/backend/galleries');
  };
</script>

<Gallery {gallery} {onWillDelete} />
