<script lang="ts" generics="T">
  import { type Snippet } from 'svelte';
  import Item from './item.svelte';
  import Popup, { bottomCenter, bottomLeft } from '../popup/popup.svelte';
  import Card from '../popup/card.svelte';
  import type { VoidCallback } from '$lib/utils/types';

  let {
    models,
    selected,
    onSelect,
    children: dropdownChildren,
  }: {
    models: readonly T[];
    selected: T | undefined;
    onSelect: (model: T) => void;
    children: Snippet<[{ model: T }]>;
  } = $props();

  let onItem = (model: T, close: VoidCallback) => {
    return () => {
      close();
      onSelect(model);
    };
  };
</script>

<Popup position={bottomLeft({ x: 0, y: 1 })}>
  {#snippet children({ open })}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="selected" onclick={open}>
      {#if selected}
        {@render dropdownChildren({ model: selected })}
      {/if}
    </div>
  {/snippet}
  {#snippet content({ close })}
    <Card>
      <div class="content">
        {#each models as model}
          {@const isSelected = model === selected}
          <Item {isSelected} onClick={onItem(model, close)}>
            {@render dropdownChildren({ model })}
          </Item>
        {/each}
      </div>
    </Card>
  {/snippet}
</Popup>

<style lang="scss">
  .selected {
    min-height: 24px;
    background: var(--dark-color);
    color: var(--dark-white-color);
    font-weight: 600;
    line-height: 14px;
    padding: 3px 8px;
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .content {
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
