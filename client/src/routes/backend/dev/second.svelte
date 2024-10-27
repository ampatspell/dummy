<script lang="ts" module>
  export type SecondInput = {
    title: string;
  };

  export type SecondOutput = {
    ok: boolean;
  };
</script>

<script lang="ts">
  import Button from '$base/components/dark/button.svelte';
  import Actions from '$base/components/dark/modals/modal/actions.svelte';
  import Header from '$base/components/dark/modals/modal/header.svelte';
  import Modal from '$base/components/dark/modals/modal/modal.svelte';
  import type { ModalRuntime } from '$base/components/dark/modals/models/modal.svelte';

  let { modal }: { modal: ModalRuntime<SecondInput, SecondOutput> } = $props();
  let title = $derived(modal.props.title);
  let onCancel = () => modal.dismiss();
  let onConfirm = () => modal.resolve({ ok: true });
</script>

<Modal>
  <Header {title} />
  <Actions>
    <Button label="Cancel" onClick={onCancel} />
    <Button label="Confirm" onClick={onConfirm} />
  </Actions>
</Modal>
