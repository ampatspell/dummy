<script lang="ts">
  import Overflow from '$base/components/dark/overflow.svelte';
  import type { PageModel } from '$base/lib/pages/page.svelte';

  let { page }: { page: PageModel } = $props();
</script>

<Overflow overflow="y">
  <div class="master">
    {page}
  </div>
</Overflow>

<style lang="scss">
  .master {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
</style>
