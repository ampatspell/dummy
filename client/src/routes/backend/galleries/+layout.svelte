<script lang="ts">
  import Galleries from '$dummy/components/backend/routes/galleries/galleries.svelte';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import type { GalleryBaseModel } from '$dummy/lib/assets/gallery.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let id = $derived(data.id);
  let galleries = $derived(data.galleries);
  $effect(() => subscribe(galleries));

  let route = (gallery: GalleryBaseModel) => `/backend/galleries/${gallery.id}`;
</script>

<Galleries {id} {galleries} {route}>
  {@render children()}
</Galleries>
