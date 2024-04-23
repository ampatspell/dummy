<script lang="ts">
  import type { Document, GalleryData } from '$lib/types';

  let {
    galleries,
  }: {
    galleries: Document<GalleryData>[];
  } = $props();
</script>

<div class="galleries">
  {#each galleries as gallery}
    <div class="gallery">
      <a class="link" href="/galleries/{gallery.id}">{gallery.data.name}</a>
    </div>
  {/each}
</div>

<style lang="scss">
  .galleries {
    display: flex;
    flex-direction: row;
    gap: 10px;
    > .gallery {
      > .link {
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
      &::after {
        content: ' • ';
      }
      &:last-child {
        &::after {
          content: '';
        }
      }
    }
  }
</style>
