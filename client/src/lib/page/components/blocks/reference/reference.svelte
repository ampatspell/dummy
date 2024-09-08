<script lang="ts">
  import type { BlockReference } from '$lib/page/models/blocks/block/reference.svelte';
  import Block from '../block.svelte';
  import Placeholder from './placeholder.svelte';

  let {
    reference,
    isEditable,
  }: {
    reference: BlockReference;
    isEditable: boolean;
  } = $props();
</script>

{#if reference.state === 'blank'}
  <Placeholder label="Blank" {isEditable} />
{:else if reference.state === 'missing'}
  <Placeholder label={reference.message} {isEditable} />
{:else if reference.state === 'exists'}
  <Block block={reference.content} />
{/if}
