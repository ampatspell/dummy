<script lang="ts">
  import Grid from '$lib/gallery/grid/grid.svelte';

  let { data } = $props();
  let images = $derived(data.images);
</script>

<div class="page">
  <Grid {images} />
</div>
