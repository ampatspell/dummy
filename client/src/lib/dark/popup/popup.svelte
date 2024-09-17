<script lang="ts" module>
  export type Position = (popup: DOMRectReadOnly, content: DOMRectReadOnly) => { top: number; left: number };

  const middleWidth = (popup: DOMRectReadOnly, content: DOMRectReadOnly) => {
    return popup.width / 2 - content.width / 2;
  };

  const middleHeight = (popup: DOMRectReadOnly, content: DOMRectReadOnly) => {
    return popup.height / 2 - content.height / 2;
  };

  const bottomHeight = (popup: DOMRectReadOnly, content: DOMRectReadOnly, opts: { y: number }) => {
    return popup.height + opts.y;
  };

  export const bottomLeft = (opts: { x: number, y: number }): Position => {
    return (popup, content) => {
      return {
        top: bottomHeight(popup, content, opts),
        left: opts.x,
      };
    };
  };

  export const bottomCenter = (opts: { y: number }): Position => {
    return (popup, content) => {
      return {
        top: bottomHeight(popup, content, opts),
        left: middleWidth(popup, content),
      };
    };
  };

  export const middle = (): Position => {
    return (popup, content) => {
      return {
        top: middleHeight(popup, content),
        left: middleWidth(popup, content),
      };
    };
  };
</script>

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
    position: optionalPosition,
  }: {
    children: SnippetWithHash;
    content: SnippetWithHash;
    position?: Position;
  } = $props();

  let position = $derived(optionalPosition ?? middle());

  let isOpen = $state(false);
  let open = () => {
    isOpen = true;
  };

  let close = () => {
    isOpen = false;
  };

  let popupElement = $state<HTMLDivElement>();
  let contentElement = $state<HTMLDivElement>();

  let popupRect = $state<DOMRectReadOnly>();
  let contentRect = $state<DOMRectReadOnly>();

  let rect = $derived.by(() => {
    if (popupRect && contentRect) {
      return position(popupRect, contentRect);
    }
  });

  $effect(() => {
    if (popupElement) {
      let observer = new ResizeObserver(([entry]) => {
        contentRect = entry.contentRect;
      });
      observer.observe(popupElement);
      return () => {
        observer.disconnect();
      };
    }
  });

  $effect(() => {
    if (contentElement) {
      let observer = new ResizeObserver(([entry]) => {
        contentRect = entry.contentRect;
      });
      observer.observe(contentElement);
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

<div class="popup">
  <div class="children" bind:this={popupElement}>
    {@render children(hash)}
  </div>
  {#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="overlay" onclick={close}></div>
    <div class="content" style:--top="{rect?.top ?? 0}px" style:--left="{rect?.left ?? 0}px" bind:this={contentElement}>
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
    > .children {
      user-select: none;
    }
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
      left: var(--left);
    }
  }
</style>
