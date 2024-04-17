<script lang="ts">
  let { data } = $props();
  console.log(data);
</script>

<div class="page">
  {#each data.galleries as gallery}
    <a href="/galleries/{gallery.id}">{gallery.data.name}</a>
  {/each}
</div>

<style lang="scss">
  .page {
  }
</style>
