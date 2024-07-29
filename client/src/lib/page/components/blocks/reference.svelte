<script lang="ts">
  import type { BlockReference } from '$lib/page/models/blocks/block/reference.svelte';
  import Block from './block.svelte';

  let { reference }: { reference: BlockReference } = $props();
  let block = $derived(reference.content);
</script>

{#if block}
  <Block {block} />
{:else}
  <div class="not-found">Block {reference.type} = {reference.value} was not found</div>
{/if}

<style lang="scss">
  .not-found {
    padding: 10px;
    border: 1px solid fade-out(red, 0.9);
    background: fade-out(red, 0.95);
  }
</style>
