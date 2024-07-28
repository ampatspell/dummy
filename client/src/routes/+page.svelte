<script lang="ts">
  import Galleries from "$lib/layout/galleries.svelte";
  import type { Document, GalleryData } from "$lib/types";

  let {
    data
  }: {
    data: {
      galleries: Document<GalleryData>[];
    };
  } = $props();

  let galleries = $derived(data.galleries);
</script>

<div class="page">
  <div class="hero">
    <div class="value">čau kā iet ko dari?</div>
  </div>
  <div class="galleries">
    <Galleries {galleries} />
  </div>
</div>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .hero {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      > .value {
        font-size: max(min(5vw, 126px), 14px);
        font-weight: 100;
        color: fade-out(#000, 0.8);
      }
    }
    > .galleries {
      padding: 50px;
    }
  }
</style>
