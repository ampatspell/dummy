<script lang="ts">
  import Page from '$dummy/components/dark/section/page/page.svelte';
  import SignOut from '$dummy/components/dark/section/page/sign-out.svelte';
</script>

{#snippet actions()}
  <SignOut />
{/snippet}

<Page title="Profile" {actions}></Page>
