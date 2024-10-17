<script lang="ts">
  import LucideImages from '$base/components/icons/lucide--images.svelte';
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte.js';
  import { buildGalleryByIdModel } from '$base/lib/galleries/gallery.svelte.js';
  import Page from '$base/components/backend/page/page.svelte';
  import { isTruthy } from '$base/lib/utils/array';
  import Delete from '$base/components/backend/page/delete.svelte';
  import { goto } from '$app/navigation';

  let { data } = $props();

  let gallery = $derived(buildGalleryByIdModel({ id: data.id }));
  $effect(() => subscribe(gallery));

  let title = $derived.by(() => {
    return ['Gallery', gallery.isLoaded && `"${gallery.name}"`].filter(isTruthy).join(' ');
  });

  let onDelete = async () => {
    goto('/backend/galleries');
    await gallery.delete();
  };
</script>

{#snippet actions()}
  <Delete {onDelete} />
{/snippet}

<Page {title} icon={LucideImages} {actions}></Page>
