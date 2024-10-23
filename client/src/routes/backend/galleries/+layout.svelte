<script lang="ts">
  import Galleries from '$base/components/backend/routes/galleries/galleries.svelte';
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte';
  import { GalleriesModel } from '$base/lib/galleries/galleries.svelte';
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  let galleries = new GalleriesModel({});
  $effect(() => subscribe(galleries));

  let route = (gallery: GalleryModel) => `/backend/galleries/${gallery.id}`;
</script>

<Galleries {galleries} {route}>
  {@render children()}
</Galleries>
