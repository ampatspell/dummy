<script lang="ts">
  import type { Document, GalleryData } from '$lib/types';
  import Galleries from './desktop/galleries.svelte';
  import Menu from './mobile/menu.svelte';

  let {
    name,
    galleries,
  }: {
    name: string;
    galleries: Document<GalleryData>[];
  } = $props();
</script>

<div class="header">
  <div class="content">
    <div class="title">
      <a class="link" href="/">{name}</a>
    </div>

    <div class="mobile">
      <Menu {name} {galleries} />
    </div>

    <div class="desktop">
      <Galleries {galleries} />
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
      > .mobile {
        display: none;
      }
      @media (max-width: 600px) {
        > .mobile {
          display: block;
        }
        > .desktop {
          display: none;
        }
      }
    }
  }
</style>
