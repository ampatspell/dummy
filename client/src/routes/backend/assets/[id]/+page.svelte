<script lang="ts">
  import { goto } from '$app/navigation';
  import Asset from '$dummy/components/backend/routes/assets/asset/asset.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let gallery = $derived(data.gallery);

  let onWillDelete = () => {
    goto('/backend/galleries');
  };
</script>

<Asset {gallery} {onWillDelete} />
