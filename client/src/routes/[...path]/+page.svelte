<script lang="ts">
  import { getPageRuntimeContext } from '$dummy/lib/pages/runtime.svelte';
  import Page from '$dummy/components/frontend/page/page.svelte';

  let runtime = getPageRuntimeContext();
</script>

<Page {runtime} />
