<script lang="ts">
  import Dark from '$lib/dark/dark.svelte';
  import Sidebar from '$lib/dark/sidebar.svelte';
  import { BlockModel } from '../models/blocks/block/block.svelte';
  import { PageModel } from '../models/page.svelte';
  import Block from './block.svelte';
  import Page from './page.svelte';

  let { page }: { page: PageModel } = $props();
  let model = $derived(page.selected);
</script>

<Dark>
  <Sidebar position="right" width={200}>
    {#if model instanceof PageModel}
      <Page {model} />
    {:else if model instanceof BlockModel}
      <Block {model} />
    {/if}
  </Sidebar>
</Dark>
