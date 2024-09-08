<script lang="ts">
  import { getter, options } from '$lib/utils/options';
  import type { VoidCallback } from '$lib/utils/types';
  import type { Snippet } from 'svelte';

  type Hash = {
    open: VoidCallback;
    close: VoidCallback;
    isOpen: boolean;
  };

  type SnippetWithHash = Snippet<[Hash]>;

  let {
    children,
    content,
  }: {
    children: SnippetWithHash;
    content: SnippetWithHash;
  } = $props();

  let isOpen = $state(false);
  let open = () => (isOpen = true);
  let close = () => (isOpen = false);

  let popup = $state<HTMLDivElement>();
  let top = $state(0);
  let offset = 1;

  $effect(() => {
    if (popup) {
      let observer = new ResizeObserver(([entry]) => {
        top = entry.contentRect.height + offset;
      });
      observer.observe(popup);
      return () => {
        observer.disconnect();
      };
    }
  });

  let hash = options({
    open,
    close,
    isOpen: getter(() => isOpen),
  });
</script>

<div class="popup" bind:this={popup}>
  {@render children(hash)}
  {#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="overlay" onclick={close}></div>
    <div class="content" style:--top="{top}px">
      {@render content(hash)}
    </div>
  {/if}
</div>

<style lang="scss">
  .popup {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    > .overlay {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
    > .content {
      position: absolute;
      top: var(--top);
      left: calc(100% / 2);
    }
  }
</style>
