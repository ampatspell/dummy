<script lang="ts">
  import { goto } from '$app/navigation';
  import Layout from '$dummy/components/backend/routes/layouts/layout/layout.svelte';
  import { getLayoutContext } from './context.svelte';

  let context = getLayoutContext();
  let layout = $derived(context.layout);
  let site = $derived(context.site);

  let onWillDelete = () => {
    goto('/backend/layouts');
  };
</script>

<Layout {layout} {site} {onWillDelete} />
