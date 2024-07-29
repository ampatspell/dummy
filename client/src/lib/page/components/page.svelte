<script lang="ts">
  import type { PageModel } from '../models/page.svelte';
  import BlockReference from './blocks/reference.svelte';

  let { page }: { page: PageModel } = $props();
  let reference = $derived(page.block);
</script>

<div class="page">
  <BlockReference {reference} />
</div>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
