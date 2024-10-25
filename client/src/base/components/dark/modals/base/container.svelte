<script lang="ts">
  import { getActiveInputElement } from '$base/lib/utils/dom';
  import type { Modal } from '../models/modal.svelte';

  let { modal }: { modal: Modal<any> } = $props();

  let placement = $derived(modal.placement);
  let Component = $derived(modal.component);
  let runtime = $derived(modal.runtime);
  let block = $derived(modal.block);

  let element = $state<HTMLDivElement>();
  let onmousedown = (e: Event) => {
    if (e.target === element) {
      e.preventDefault();
    }
  };
  let onclick = (e: Event) => {
    if (e.target === element) {
      modal.onClickOutside();
    }
  };
  let onkeyup = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && !e.shiftKey && !getActiveInputElement()) {
      modal.onClickOutside();
    }
  };
</script>

<svelte:window {onkeyup} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="modal"
  class:placement-center={placement === 'center'}
  class:block
  bind:this={element}
  {onmousedown}
  {onclick}
>
  <div class="content">
    <Component modal={runtime} />
  </div>
</div>

<style lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;

    pointer-events: none;
    > .content {
      pointer-events: auto;
    }
    &.block {
      pointer-events: auto;
    }

    &.placement-center {
      align-items: center;
      justify-content: center;
    }
  }
</style>
