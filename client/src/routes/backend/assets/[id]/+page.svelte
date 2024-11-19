<script lang="ts">
  import { goto } from '$app/navigation';
  import Asset from '$dummy/components/backend/routes/assets/asset/asset.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let folder = $derived(data.folder);

  let onWillDelete = () => {
    goto('/backend/assets');
  };
</script>

<Asset {folder} {onWillDelete} />
