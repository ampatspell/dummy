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
    justify-content: center;
    gap: 30px;
    > .gallery {
      > .link {
        text-decoration: none;
        font-size: max(min(2vw, 21px), 14px);
        font-weight: 500;
        text-transform: uppercase;
        transition: color 0.15s ease-in-out;
        &:hover {
          color: red;
        }
      }
    }
  }
</style>
