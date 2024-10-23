<script lang="ts">
  import type { GalleryImageModel } from '$base/lib/galleries/image.svelte';
  import { untrack } from 'svelte';

  let { image, size }: { image: GalleryImageModel; size: number } = $props();

  let src = $derived(image.data?.sizes['120x120'].url);
  let name = $derived(image.data?.name);
  let isSelected = $derived(image.runtime.isSelected);
  let isLoaded = $state(false);

  let onload = () => {
    isLoaded = true;
  };

  let onclick = (e: MouseEvent) => {
    e.stopPropagation();
    const replace = !e.shiftKey;
    image.runtime.toggle({ replace });
  };
</script>

<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="image" class:selected={isSelected} role="button" style:--size="{size}px" {onclick}>
  <img class="img" class:loaded={isLoaded} draggable="false" alt={name} {src} {onload} />
  <div class="footer">
    {name}
  </div>
</div>

<style lang="scss">
  .image {
    width: var(--size);
    height: var(--size);
    border: 1px solid var(--dark-border-color-2);
    display: flex;
    flex-direction: column;
    min-width: 0;
    transition: 0.15s ease-in-out box-shadow;
    > .img {
      flex: 1;
      padding: 2px;
      display: flex;
      object-fit: contain;
      overflow: hidden;
      opacity: 0;
      transition: 0.15s ease-in-out opacity;
      &.loaded {
        opacity: 1;
      }
    }
    > .footer {
      padding: 0 2px 2px 2px;
      font-size: 11px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      min-width: 0;
      text-align: center;
    }
    &:hover {
      border-color: var(--dark-border-color-1);
      box-shadow: 0 1px 5px fade-out(#000, 0.9);
    }
    &.selected {
      --color: var(--dark-selected-background-color-2);
      border-color: var(--color);
      background: var(--color);
    }
  }
</style>
