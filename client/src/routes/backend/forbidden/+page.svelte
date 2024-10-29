<script lang="ts">
  import Admin from './admin/admin.svelte';
</script>

<div class="page">Sorry, you're not an admin.</div>

<Admin />

<style lang="scss">
  .page {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
