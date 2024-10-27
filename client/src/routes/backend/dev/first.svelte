<script lang="ts" module>
  export type FirstProps = {
    title: string;
  };

  export type FirstResolution = {
    ok: boolean;
  };
</script>

<script lang="ts">
  import Button from '$base/components/dark/button.svelte';
  import { getModalsContext } from '$base/components/dark/modals/base/context.svelte';
  import type { ModalRuntime } from '$base/components/dark/modals/base/modal.svelte';
  import { relativeToBottomLeft } from '$base/components/dark/modals/base/placement/relative-to/relative-to.svelte';
  import Actions from '$base/components/dark/modals/modal/actions.svelte';
  import Header from '$base/components/dark/modals/modal/header.svelte';
  import Modal from '$base/components/dark/modals/modal/modal.svelte';
  import Second from './second.svelte';

  let { modal }: { modal: ModalRuntime<FirstProps, FirstResolution> } = $props();

  let modals = getModalsContext();

  let title = $derived(modal.props.title);
  let onCancel = () => modal.dismiss();
  let onConfirm = () => modal.resolve({ ok: true });

  let content = $state<HTMLDivElement>();

  let onSecond = async () => {
    let res = await modals.open({
      component: Second,
      props: {
        title: 'Second',
      },
      cancel: { ok: false },
      placement: relativeToBottomLeft({
        relativeTo: content,
        offset: {
          x: 0,
          y: 2,
        },
      }),
    });
    console.log('second', res);
  };
</script>

<Modal>
  <Header {title} />
  <div class="conent" bind:this={content}>
    <Button label="Second" onClick={onSecond} />
  </div>
  <Actions>
    <Button label="Cancel" onClick={onCancel} />
    <Button label="Confirm" onClick={onConfirm} />
  </Actions>
</Modal>
