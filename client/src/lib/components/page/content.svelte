<script lang="ts">
  import Block from '../blocks/block/block.svelte';
  import type { PageModel } from './models/page.svelte';

  let {
    page,
  }: {
    page: PageModel;
  } = $props();

  const block = $derived(page.block);
</script>

<div class="content">
  {#if block}
    <Block {block} />
  {:else}
    No root block for {page}
  {/if}
</div>

<style lang="scss">
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
