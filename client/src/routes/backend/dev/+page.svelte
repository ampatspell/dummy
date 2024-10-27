<script lang="ts">
  import Dropdown from '$base/components/dark/dropdown/dropdown.svelte';
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte';
  import { GalleriesModel } from '$base/lib/galleries/galleries.svelte';
  import { GalleryModel } from '$base/lib/galleries/gallery.svelte';

  let galleries = new GalleriesModel({});
  $effect(() => subscribe(galleries));

  let selected = $state<GalleryModel>();
  let onSelect = (model?: GalleryModel) => {
    selected = model;
  };
</script>

{#snippet item(model?: GalleryModel, isSelected?: boolean)}
  <div class="gallery" class:selected={isSelected}>
    {#if model}
      {model.name}
    {:else}
      Not selected
    {/if}
  </div>
{/snippet}

<div class="page">
  <div class="dropdown">
    <Dropdown items={galleries.all} {selected} {onSelect} {item} />
  </div>
</div>

<style lang="scss">
  .page {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    > .dropdown {
      width: 200px;
    }
  }
  .gallery {
    &.selected {
      font-weight: 600;
    }
  }
</style>
