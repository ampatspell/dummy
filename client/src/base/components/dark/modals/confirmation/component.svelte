<script lang="ts">
  import Button from '../../button.svelte';
  import Actions from '../modal/actions.svelte';
  import Header from '../modal/header.svelte';
  import Modal from '../modal/modal.svelte';
  import type { ModalRuntime } from '../models/modal.svelte';
  import type { ConfirmationProps, ConfirmationResolution } from './models';

  let { modal }: { modal: ModalRuntime<ConfirmationProps, ConfirmationResolution> } = $props();

  let title = $derived(modal.props.title);
  let cancel = $derived(modal.props.cancel ?? 'Cancel');
  let confirm = $derived(modal.props.confirm);

  let isCancelDisabled = $derived(!modal.isDismissible);
  let onCancel = () => modal.dismiss();
  let onConfirm = () => modal.resolve(true);
</script>

<Modal>
  <Header {title} />
  <Actions>
    <Button label={cancel} isDisabled={isCancelDisabled} onClick={onCancel} />
    <Button label={confirm} onClick={onConfirm} />
  </Actions>
</Modal>
