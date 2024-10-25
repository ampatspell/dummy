<script lang="ts">
  import Button from '$base/components/dark/button.svelte';
  import Modals from '$base/components/dark/modals/modals.svelte';
  import { createModalsContext, type ModalRuntime } from '$base/components/dark/modals/models.svelte';
    import type { Component, ComponentProps } from 'svelte';
  import Hello from './hello.svelte';

  const modals = createModalsContext();

  type ModalAllProps<T> = T extends Component<infer Props> ? Props : never;
  type ModalProps<T> = Omit<ModalAllProps<T>, 'resolve'>;
  type ModalResolve<T> = ModalAllProps<T>['resolve'];
  type ModalResolveArg<T> = Parameters<ModalResolve<T>>[0];

  type HelloProps = ModalProps<typeof Hello>;
  type HelloResolve = ModalResolveArg<typeof Hello>;

  type Props = {
    title: string;
  };

  type Resolution = 'cancel' | 'save';

  let onClick = async () => {
    let res = await modals.open<Props, Resolution>({
      props: {
        title: 'Hello',
      },
      snippet: modal,
      placement: 'center',
      block: false,
      cancel: () => 'cancel',
    });
    console.log('done', res);
  };
</script>

{#snippet modal(modal: ModalRuntime<Props, Resolution>)}
  <div class="modal">
    <div class="header">{modal.props.title}</div>
    <div class="actions">
      <Button
        label="Cancel"
        onClick={() => modal.resolve('cancel')}
      />
      <Button
        label="Save"
        onClick={() => modal.resolve('save')}
      />
    </div>
  </div>
{/snippet}

<div class="page">
  <Button label="Open" {onClick} />
</div>

<Modals />

<style lang="scss">
  @use 'sass:color';
  .page {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .modal {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--dark-border-color-1);
    box-shadow: 0 2px 5px color.adjust(#000, $alpha: -0.9);
    border-radius: 6px;
    padding: 10px;
    gap: 10px;
    min-width: 200px;
    > .header {
      font-weight: 600;
    }
    > .actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: 5px;
    }
  }
</style>
