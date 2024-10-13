<script lang="ts">
  import { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
  import Dark from '$lib/components/dark/dark.svelte';
  import Inspector from '$lib/components/dark/inspector/inspector.svelte';
  import { PageModel } from '../models/page.svelte';
  import Block from './block/block.svelte';
  import Page from './page.svelte';

  let {
    page,
  }: {
    page: PageModel;
  } = $props();

  const model = $derived(page.selected);
</script>

<Dark>
  <div class="inspector">
    <Inspector>
      {#if model instanceof PageModel}
        <Page {model} />
      {:else if model instanceof BlockModel}
        <Block {model} />
      {/if}
    </Inspector>
  </div>
</Dark>

<style lang="scss">
  .inspector {
    flex: 1;
    width: 250px;
    display: flex;
    flex-direction: column;
  }
</style>
