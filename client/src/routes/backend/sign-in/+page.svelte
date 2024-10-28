<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '$dummy/components/dark/button.svelte';
  import { getSession } from '$dummy/lib/session/session.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let onClick = async () => {
    await getSession().signInWithGoogle();
    const next = data.next ?? '/backend';
    goto(next);
  };
</script>

<div class="page">
  <Button label="Sign in with Google" {onClick} />
</div>

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
