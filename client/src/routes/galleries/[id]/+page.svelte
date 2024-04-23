<script lang="ts">
  import Vertical from '$lib/gallery/vertical/vertical.svelte';

  let { data } = $props();
</script>

<div class="page">
  <Vertical images={data.images} />
</div>

<style lang="scss">
  .page {
    padding: 10px 0;
  }
</style>
