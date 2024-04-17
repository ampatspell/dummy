<script lang="ts">
  let { data } = $props();
</script>

<div class="page">
  <div class="name">{data.gallery.data.name}</div>
  <div class="images">
    {#each data.images as image}
      <div class="image" style:--url="url({image.data.sizes['2048x2048'].url})"></div>
    {/each}
  </div>
</div>

<style lang="scss">
  .page {
    > .images {
      display: flex;
      flex-direction: column;
      gap: 32px;
      > .image {
        width: 100%;
        height: calc(100vh - 64px);
        background-image: var(--url);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }
</style>
