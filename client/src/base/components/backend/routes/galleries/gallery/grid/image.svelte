<script lang="ts">
  import type { GalleryImageModel } from '$base/lib/galleries/image.svelte';

  let { image, size, isEditing }: { image: GalleryImageModel; size: number; isEditing: boolean; } = $props();

  let src = $derived(image.thumbnails['120x120'].url);
  let name = $derived(image.name);
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
<div class="image" class:selected={isSelected} class:is-editing={isEditing} role="button" style:--size="{size}px" {onclick}>
  <img class="img" class:loaded={isLoaded} draggable="false" alt={name} {src} {onload} />
  <div class="footer">
    {name}
  </div>
</div>

<style lang="scss">
  @use 'sass:color';
  .image {
    width: var(--size);
    height: var(--size);
    display: flex;
    flex-direction: column;
    min-width: 0;
    border: 1px solid var(--dark-border-color-2);
    border-radius: 3px;
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
    &.is-editing {
      &:hover {
        border-color: var(--dark-border-color-1);
        box-shadow: 0 1px 5px color.adjust(#000, $alpha: -0.9);
      }
      &.selected {
        background: var(--dark-selected-background-color-2);
      }
    }
  }
</style>
