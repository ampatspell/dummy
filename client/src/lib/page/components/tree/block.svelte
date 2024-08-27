<script lang="ts">
  import Item from '$lib/dark/tree/item.svelte';
  import { BlockModel } from '$lib/page/models/blocks/block/block.svelte';
  import type { BlockReference } from '$lib/page/models/blocks/block/reference.svelte';

  let { reference, level }: { reference: BlockReference; level: number } = $props();

  let padding = $derived(`${level * 10}px`);
</script>

{#snippet exists(block: BlockModel)}
  <div class="name">{block.info.type}</div>
  <div class="description">{block.info.description || 'No description'}</div>
{/snippet}

{#snippet blank()}
  <div class="name">Blank</div>
  <div class="description">Block not set</div>
{/snippet}

{#snippet missing(message: string)}
  <div class="name">Missing</div>
  <div class="description">{message}</div>
{/snippet}

<Item model={reference}>
  <div class="item" style:--padding={padding}>
    {#if reference.state === 'blank'}
      {@render blank()}
    {:else if reference.state === 'missing'}
      {@render missing(reference.message)}
    {:else if reference.state === 'exists'}
      {@render exists(reference.content)}
    {/if}
  </div>
</Item>

{#if reference.state === 'exists' && reference.content.children.length > 0}
  {#each reference.content.children as child}
    <svelte:self reference={child} level={level + 1} />
  {/each}
{/if}

<style lang="scss">
  .item {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 0 0 0 var(--padding);
  }

  .name {
    font-weight: 600;
  }

  .name,
  .description {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
