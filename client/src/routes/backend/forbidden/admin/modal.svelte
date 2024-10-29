<script lang="ts" module>
  export type MakeAdminModalProps = Record<string, never>;
  export type MakeAdminModalResult = Record<string, never>;
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '$dummy/components/dark/button.svelte';
  import type { ModalRuntime } from '$dummy/components/dark/modals/base/modal.svelte';
  import Modal from '$dummy/components/dark/modals/modal/modal.svelte';
  import { getSession } from '$dummy/lib/session/session.svelte';

  let { modal }: { modal: ModalRuntime<MakeAdminModalProps, MakeAdminModalResult> } = $props();

  type State = 'idle' | 'busy' | 'admin' | 'failed';
  let state = $state<State>('idle');
  let isBusy = $derived(state === 'busy');

  let session = getSession();

  let onPerform = async () => {
    if (isBusy) {
      return;
    }
    state = 'busy';
    try {
      let res = await session.setRole(session.user!.uid, 'admin');
      if (res.status === 'success' && res.result.status === 'success') {
        state = 'admin';
      } else {
        console.log(res);
        state = 'failed';
      }
    } catch (err: unknown) {
      console.log(err);
      state = 'failed';
    }
  };

  let onSignOut = async () => {
    modal.dismiss();
    await session.signOut();
    goto('/backend');
  };
</script>

<Modal size={{ width: 300, height: 200 }}>
  <div class="content">
    {#if state === 'idle'}
      <div class="message">Make yourself an admin.</div>
      <Button label="Perform" onClick={onPerform} isDisabled={isBusy} />
    {:else if state === 'busy'}
      Making you an admin…
    {:else if state === 'admin'}
      <div class="message">
        <div class="row">You are now an admin.</div>
        <div class="row">Please sign out and sign back in.</div>
      </div>
      <Button label="Sign out" onClick={onSignOut} />
    {:else if state === 'failed'}
      <div class="message">Failed to make you an admin.</div>
      <Button label="Try again" onClick={onPerform} isDisabled={isBusy} />
    {/if}
  </div>
</Modal>

<style lang="scss">
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    > .message {
      text-align: center;
    }
  }
</style>
