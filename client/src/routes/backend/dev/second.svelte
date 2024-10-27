<script lang="ts" module>
  export type SecondProps = {
    title: string;
  };

  export type SecondResolution = {
    ok: boolean;
  };
</script>

<script lang="ts">
  import Button from '$base/components/dark/button.svelte';
  import type { ModalRuntime } from '$base/components/dark/modals/base/modal.svelte';
  import Actions from '$base/components/dark/modals/modal/actions.svelte';
  import Header from '$base/components/dark/modals/modal/header.svelte';
  import Modal from '$base/components/dark/modals/modal/modal.svelte';

  let { modal }: { modal: ModalRuntime<SecondProps, SecondResolution> } = $props();
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
