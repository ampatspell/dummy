<script lang="ts">
  import { goto } from '$app/navigation';
  import New from '$base/components/backend/pages/galleries/new.svelte';
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte';
  import { buildNewGalleryModel } from '$base/lib/galleries/gallery.svelte';

  let gallery = buildNewGalleryModel({
    data: {
      name: 'Untitled',
    },
  });
  $effect(() => subscribe(gallery));

  let onSaved = () => {
    goto(`/backend/galleries/${gallery.id}`);
  };
</script>

<New {gallery} {onSaved} />
