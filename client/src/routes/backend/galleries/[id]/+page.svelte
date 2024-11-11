<script lang="ts">
  import { goto } from '$app/navigation';
  import Gallery from '$dummy/components/backend/routes/galleries/gallery/gallery.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let gallery = $derived(data.gallery);

  let onWillDelete = () => {
    goto('/backend/galleries');
  };
</script>

<Gallery {gallery} {onWillDelete} />
