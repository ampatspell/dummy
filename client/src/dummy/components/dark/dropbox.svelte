<script lang="ts">
  import { isTruthy } from '$dummy/lib/utils/array';
  import type { VoidCallback } from '$dummy/lib/utils/types';
  import type { Snippet } from 'svelte';

  let {
    onFiles,
    children,
  }: {
    onFiles: (files: File[]) => void;
    children: Snippet;
  } = $props();

  let over = $state(false);

  let toFiles = (e: DragEvent) => {
    const items = e.dataTransfer?.items;
    return [...(items ?? [])]
      .map((item) => item.getAsFile())
      .filter(isTruthy)
      .filter((file) => file.type.startsWith('image/'));
  };

  let cancel: VoidCallback | undefined;

  let later = (cb: VoidCallback) => {
    let cancelled = false;
    setTimeout(() => {
      if (!cancelled) {
        cb();
      }
    }, 0);
    return () => {
      cancelled = true;
    };
  };

  let ondragleave = () => {
    cancel?.();
    cancel = later(() => {
      over = false;
    });
  };

  let ondragover = (e: Event) => {
    e.preventDefault();
    cancel?.();
    over = true;
  };

  let ondrop = (e: DragEvent) => {
    e.preventDefault();
    cancel?.();
    over = false;
    let files = toFiles(e);
    if (files?.length > 0) {
      onFiles(files);
    }
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="dropbox" {ondragleave} {ondragover} {ondrop}>
  <div class="content">
    {@render children()}
  </div>
  {#if over}
    <div class="placeholder">
      <div class="content">
        <div class="details">Drop files to upload</div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .dropbox {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    > .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    > .placeholder {
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: var(--dark-white-color);
      > .content {
        flex: 1;
        width: 100%;
        border: 1px solid var(--dark-selected-background-color-1);
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
