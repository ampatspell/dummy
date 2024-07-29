<script lang="ts">
  import type { TextBlockModel } from '$lib/page/models/blocks/block/block.svelte';
  import { valueWithUnitDefinitionToStyleValue } from '$lib/utils/data';

  let { block }: { block: TextBlockModel } = $props();
  let isEditing = $derived(block.isEditing);

  let fontSize = $derived(valueWithUnitDefinitionToStyleValue(block.fontSize));

  let onblur = (e: Event) => {
    let value = (e.target as HTMLDivElement).innerText;
    block.updateText(value);
  };

  let value = $state<HTMLDivElement>();

  $effect(() => {
    if (isEditing === true) {
      value?.focus();
    }
  });
</script>

<div class="text-block" class:editing={isEditing} style:--font-size={fontSize}>
  <div class="value" contenteditable={isEditing} {onblur} bind:this={value}>{block.text}</div>
</div>

<style lang="scss">
  .text-block {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    > .value {
      outline: none;
      white-space: pre-wrap;
      font-size: var(--font-size, --theme-font-size);
    }
    &.editing {
      > .value {
        &:empty {
          &:after {
            content: 'Write something';
            opacity: 0.5;
          }
        }
      }
    }
  }
</style>
