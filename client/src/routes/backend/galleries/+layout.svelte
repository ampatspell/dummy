<script lang="ts">
  import Galleries from '$dummy/components/backend/routes/galleries/galleries.svelte';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import type { GalleryModel } from '$dummy/lib/galleries/gallery.svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let id = $derived(data.id);
  let galleries = $derived(data.galleries);
  $effect(() => subscribe(galleries));

  let route = (gallery: GalleryModel) => `/backend/galleries/${gallery.id}`;
</script>

<Galleries {id} {galleries} {route}>
  {@render children()}
</Galleries>
