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

  export const bottomLeft = (opts: { x: number; y: number }): Position => {
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

  class PopupElementState {
    element = $state<HTMLDivElement>();
    rect = $state<DOMRectReadOnly>();

    constructor(state: PopupObserver) {
      $effect(() => {
        const element = this.element;
        if (element) {
          return state.observe(this);
        }
      });
    }

    onEntry(entry: ResizeObserverEntry) {
      this.rect = entry.contentRect;
    }
  }

  type PopupObserverOptions = {
    position?: Position;
  };

  class PopupObserver {
    private readonly options: PopupObserverOptions;
    private observer?: ResizeObserver;

    readonly popup: PopupElementState;
    readonly content: PopupElementState;
    readonly elements: PopupElementState[];

    constructor(opts: OptionsInput<PopupObserverOptions>) {
      this.options = options(opts);
      this.popup = new PopupElementState(this);
      this.content = new PopupElementState(this);
      this.elements = [this.popup, this.content];
      $effect.pre(() => {
        this.observer = new ResizeObserver((entries) => {
          this.onEntries(entries);
        });
        return () => {
          this.observer?.disconnect();
        };
      });
    }

    observe(state: PopupElementState) {
      let element = state.element;
      let observer = this.observer;
      if (element && observer) {
        observer.observe(element);
        return () => {
          observer.unobserve(element);
        };
      }
    }

    private onEntries(entries: ResizeObserverEntry[]) {
      for (let entry of entries) {
        let target = entry.target;
        let state = this.elements.find((element) => element.element === target);
        if (state) {
          state.onEntry(entry);
        }
      }
    }

    private position = $derived.by(() => {
      return this.options.position ?? middle();
    });

    rect = $derived.by(() => {
      let popup = this.popup.rect;
      let content = this.content.rect;

      if (popup && content) {
        let position = this.position;
        return position(popup, content);
      }

      return { top: 0, left: 0 };
    });
  }
</script>

<script lang="ts">
  import { getter, options, type OptionsInput } from '$lib/utils/options';
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
    position,
  }: {
    children: SnippetWithHash;
    content: SnippetWithHash;
    position?: Position;
  } = $props();

  let isOpen = $state(false);
  let open = () => {
    isOpen = true;
  };

  let close = () => {
    isOpen = false;
  };

  let observer = new PopupObserver({
    position: getter(() => position),
  });

  let hash = options({
    open,
    close,
    isOpen: getter(() => isOpen),
  });
</script>

<div class="popup">
  <div class="children" bind:this={observer.popup.element}>
    {@render children(hash)}
  </div>
  {#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="overlay" onclick={close}></div>
    <div
      class="content"
      style:--top="{observer.rect.top}px"
      style:--left="{observer.rect.left}px"
      bind:this={observer.content.element}
    >
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
