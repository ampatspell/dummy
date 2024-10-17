<script lang="ts">
  import Galleries from '$base/components/backend/pages/galleries/galleries.svelte';
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte';
  import { GalleriesModel } from '$base/lib/galleries/galleries.svelte';
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';

  let galleries = new GalleriesModel({});
  $effect(() => subscribe(galleries));

  let route = (gallery: GalleryModel) => `/backend/galleries/${gallery.id}`;
</script>

<Galleries {galleries} {route} />
