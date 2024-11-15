<script lang="ts">
  import SignOut from '$dummy/components/dark/section/page/sign-out.svelte';
  import Admin from './admin/admin.svelte';
</script>

<div class="page">Sorry, you're not an admin.</div>

<div class="sign-out">
  <SignOut />
</div>

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
  .sign-out {
    position: fixed;
    top: 10px;
    right: 10px;
  }
</style>
