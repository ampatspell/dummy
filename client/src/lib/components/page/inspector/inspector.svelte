<script lang="ts">
  import Dark from '$lib/components/dark/dark.svelte';
  import type { PageModel } from '../models/page.svelte';

  let {
    page,
  }: {
    page: PageModel;
  } = $props();

  let selected = $derived(page.selected);
</script>

<Dark>
  <div class="inspector">
    {selected}
  </div>
</Dark>

<style lang="scss">
  .inspector {
    width: 250px;
    height: 100%;
  }
</style>
