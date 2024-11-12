<script lang="ts">
  import type { PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';

  let { runtime }: { runtime: PageRuntimeModel } = $props();
</script>

<div class="page">
  {runtime}
</div>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
