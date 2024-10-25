<script lang="ts">
  import Overflow from '$base/components/dark/overflow.svelte';
  import type { PageModel } from '$base/lib/pages/page.svelte';

  let { page }: { page: PageModel } = $props();
  let definition = $derived(page.definition);
  let Component = $derived(definition?.backend);
</script>

<Overflow overflow="y">
  <div class="master">
    {#if definition}
      <Component {page} />
    {:else}
      <div class="placeholder">Page definition missing</div>
    {/if}
  </div>
</Overflow>

<style lang="scss">
  .master {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .placeholder {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px;
    }
  }
</style>
