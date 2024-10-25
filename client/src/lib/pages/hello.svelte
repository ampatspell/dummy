<script lang="ts">
  import Icon from '$base/components/dark/icon.svelte';
  import LucideFlame from '$base/components/icons/lucide--flame.svelte';
  import type { PageModel } from '$base/lib/pages/page.svelte';

  let { page }: { page: PageModel } = $props();
</script>

<div class="hello">
  <div class="content">
    <Icon icon={LucideFlame} size="large" />
    {page}
  </div>
</div>

<style lang="scss">
  .hello {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
  }
</style>
