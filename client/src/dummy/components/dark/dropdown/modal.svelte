<script lang="ts" module>
  import type { Snippet } from 'svelte';

  export type DropdownModalProps<T> = {
    selected: T | undefined;
    items: T[];
    // [plugin:vite-plugin-svelte] Not implemented TSInstantiationExpression
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: Snippet<[item: any, isSelected: boolean]>;
  };

  export type DropdownModalResolution<T> =
    | {
        action: 'cancel';
      }
    | {
        action: 'select';
        model: T | undefined;
      };
</script>

<script lang="ts" generics="T">
  import Modal from '$dummy/components/dark/modals/modal/modal.svelte';
  import type { ModalRuntime } from '../modals/base/modal.svelte';

  let { modal }: { modal: ModalRuntime<DropdownModalProps<T>, DropdownModalResolution<T>> } = $props();
  let items = $derived(modal.props.items);
  let item = $derived(modal.props.item);
  let selected = $derived(modal.props.selected);

  let onSelect = (model: T) => () => {
    modal.resolve({ action: 'select', model });
  };
</script>

<Modal type="blank">
  <div class="items">
    {#each items as model}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="item" onclick={onSelect(model)}>
        {@render item(model, selected === model)}
      </div>
    {/each}
  </div>
</Modal>

<style lang="scss">
  .items {
    > .item {
      padding: 5px;
      &:hover {
        background: var(--dark-selected-background-color-2);
      }
    }
  }
</style>
