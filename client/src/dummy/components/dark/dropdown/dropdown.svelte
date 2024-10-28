<script lang="ts" generics="T">
  import LucideChevronDown from '$dummy/components/icons/lucide--chevron-down.svelte';
  import LucideChevronUp from '$dummy/components/icons/lucide--chevron-up.svelte';
  import type { Snippet } from 'svelte';
  import Icon from '../icon.svelte';
  import { getModalsContext } from '../modals/base/context.svelte';
  import Modal from './modal.svelte';
  import { relativeToBottomLeft } from '../modals/base/placement/relative-to/relative-to.svelte';
  import { getter } from '$dummy/lib/utils/options';

  let {
    selected,
    items,
    onSelect,
    item,
  }: {
    selected: T | undefined;
    items: T[];
    onSelect: (model: T | undefined) => void;
    item: Snippet<[item: T | undefined, isSelected: boolean]>;
  } = $props();

  let relativeTo = $state<HTMLElement>();

  let modals = getModalsContext();
  let isOpen = $state(false);

  let onOpen = async () => {
    isOpen = true;
    try {
      let res = await modals.open({
        // [plugin:vite-plugin-svelte] Not implemented TSInstantiationExpression
        component: Modal,
        props: {
          items: getter(() => items),
          selected: getter(() => selected),
          item: getter(() => item),
        },
        cancel: { action: 'cancel' },
        placement: relativeToBottomLeft({
          relativeTo: getter(() => relativeTo),
          offset: { x: 0, y: 2 },
        }),
      });
      if (res.action === 'select') {
        onSelect(res.model as T);
      }
    } finally {
      isOpen = false;
    }
  };
</script>

<div class="dropdown">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="selected" bind:this={relativeTo} onclick={onOpen}>
    <div class="item">
      {@render item(selected, false)}
    </div>
    <Icon size="small" icon={isOpen ? LucideChevronUp : LucideChevronDown} />
  </div>
</div>

<style lang="scss">
  .dropdown {
    user-select: none;
    width: 100%;
    border: 1px solid var(--dark-border-color-1);
    border-radius: 3px;
    .selected {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;
      padding: 5px;
      > .item {
        flex: 1;
      }
    }
  }
</style>
