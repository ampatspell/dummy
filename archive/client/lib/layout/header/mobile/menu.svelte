<script lang="ts">
  import Bars from '$lib/icons/fa-solid-bars.svelte';
  import type { Document, GalleryData } from '$lib/types';

  let {
    name,
    galleries,
  }: {
    name: string;
    galleries: Document<GalleryData>[];
  } = $props();

  let isOpen = $state(false);

  let onOpen = () => {
    isOpen = true;
  };
  let onClose = () => {
    isOpen = false;
  };
</script>

<div class="menu">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="icon" onclick={onOpen}><Bars /></div>
  {#if isOpen}
    <div class="content">
      <div class="name">
        <a class="link" href="/" onclick={onClose}>{name}</a>
      </div>
      <div class="galleries">
        {#each galleries as gallery}
          <div class="gallery">
            <a class="link" href="/galleries/{gallery.id}" onclick={onClose}>{gallery.data.name}</a>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .menu {
    > .icon {
      $s: 16px;
      :global(svg) {
        width: $s;
        height: $s;
      }
    }
    > .content {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: #fff;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      > .name {
        > .link {
          font-weight: 600;
          text-decoration: none;
        }
      }
      > .galleries {
        display: flex;
        flex-direction: column;
        gap: 10px;
        > .gallery {
          display: flex;
          flex-direction: row;
          > .link {
            text-decoration: none;
          }
        }
      }
    }
  }
</style>
