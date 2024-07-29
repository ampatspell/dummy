<script lang="ts">
  import type { TextBlockModel } from '$lib/page/models/blocks/block/block.svelte';

  let { block }: { block: TextBlockModel } = $props();
  let isEditing = $derived(block.isEditing);

  let onchange = (e: Event) => {
    let value = (e.target as HTMLTextAreaElement).value;
    block.updateText(value);
  };
</script>

<div class="text-block">
  {#if isEditing}
    <textarea {onchange}>{block.text}</textarea>
  {:else}
    <div class="value">{block.text}</div>
  {/if}
</div>

<style lang="scss">
  .text-block {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>
