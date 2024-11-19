<script lang="ts">
  import Assets from '$dummy/components/backend/routes/assets/assets.svelte';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import type { FolderBaseModel } from '$dummy/lib/assets/folder.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let id = $derived(data.id);
  let galleries = $derived(data.galleries);
  $effect(() => subscribe(galleries));

  let route = (gallery: FolderBaseModel) => `/backend/galleries/${gallery.id}`;
</script>

<Assets {id} {galleries} {route}>
  {@render children()}
</Assets>
