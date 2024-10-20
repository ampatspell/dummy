<script lang="ts">
  import type { GalleryImageModel } from '$base/lib/galleries/image.svelte';

  let { image, size }: { image: GalleryImageModel; size: number } = $props();

  let onclick = (e: Event) => {
    image.select();
  };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="image" style:--size="{size}px" {onclick}>
  <!-- svelte-ignore a11y_missing_attribute -->
  <img class="img" src={image.data?.sizes['120x120'].url} draggable="false" />
  <div class="footer">
    {image?.data?.name}
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
    }
    > .footer {
      padding: 0 2px 1px 2px;
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
  }
</style>
