<script lang="ts">
	import type { Document, GalleryData } from '$lib/types';

  let {
    galleries
  }: {
    galleries: Document<GalleryData>[];
  } = $props();
</script>

<div class="header">
  <div class="content">
    <div class="title">
      <a class="link" href="/">amateurinmotion.com</a>
    </div>
    <div class="galleries">
      {#each galleries as gallery}
        <div class="gallery">
          <a class="link" href="/galleries/{gallery.id}">{gallery.data.name}</a>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .header {
    display: flex;
    flex-direction: column;
    > .content {
      display: flex;
      flex-direction: row;
      gap: 10px;
      > .title {
        font-weight: 600;
        flex: 1;
        > .link {
          text-decoration: none;
        }
      }
      > .galleries {
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
            content: " • ";
          }
          &:last-child {
            &::after {
              content: "";
            }
          }
        }
      }
    }
  }
</style>
