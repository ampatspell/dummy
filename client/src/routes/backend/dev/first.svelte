<script lang="ts" module>
  export type FirstInput = {
    title: string;
  };

  export type FirstOutput = {
    ok: boolean;
  };
</script>

<script lang="ts">
  import Button from '$base/components/dark/button.svelte';
  import Actions from '$base/components/dark/modals/modal/actions.svelte';
  import Header from '$base/components/dark/modals/modal/header.svelte';
  import Modal from '$base/components/dark/modals/modal/modal.svelte';
  import { getModalsContext } from '$base/components/dark/modals/models/context.svelte';
  import type { ModalRuntime } from '$base/components/dark/modals/models/modal.svelte';
  import Second from './second.svelte';

  let { modal }: { modal: ModalRuntime<FirstInput, FirstOutput> } = $props();

  let modals = getModalsContext();

  let title = $derived(modal.props.title);
  let onCancel = () => modal.dismiss();
  let onConfirm = () => modal.resolve({ ok: true });

  let onSecond = async () => {
    let res = await modals.open({
      component: Second,
      props: {
        title: 'Second',
      },
      cancel: { ok: false },
    });
    console.log('second', res);
  };
</script>

<Modal>
  <Header {title} />
  <div class="conent">
    <Button label="Second" onClick={onSecond} />
  </div>
  <Actions>
    <Button label="Cancel" onClick={onCancel} />
    <Button label="Confirm" onClick={onConfirm} />
  </Actions>
</Modal>
