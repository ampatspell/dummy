<script lang="ts">
  import Page from '$base/components/backend/routes/pages/page/page.svelte';
  import { getPageContext } from './context.svelte';

  let context = getPageContext();
  let page = $derived(context.page);
</script>

<Page {page} />
