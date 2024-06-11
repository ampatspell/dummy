<script lang="ts">
  import Vertical from '$lib/gallery/vertical/vertical.svelte';

  let { data } = $props();
  let images = $derived(data.images);
</script>

<div class="page">
  <Vertical {images} />
</div>

<style lang="scss">
  .page {
    padding: 10px 0;
  }
</style>
