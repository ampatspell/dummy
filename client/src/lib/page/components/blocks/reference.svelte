<script lang="ts">
  import type { BlockReference } from '$lib/page/models/blocks/block/reference.svelte';
  import Block from './block.svelte';

  let { reference }: { reference: BlockReference } = $props();
</script>

{#if reference.state === 'blank'}
  <div class="not-found">Blank</div>
{:else if reference.state === 'missing'}
  <div class="not-found">{reference.message}</div>
{:else if reference.state === 'exists'}
  <Block block={reference.content} />
{/if}

<style lang="scss">
  .not-found {
    padding: 10px;
    border: 1px solid fade-out(red, 0.9);
    background: fade-out(red, 0.95);
  }
</style>
