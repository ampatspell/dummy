<script lang="ts">
  import Button from '$base/components/dark/button.svelte';
  import type { ModalRuntime } from '$base/components/dark/modals/models.svelte';

  let {
    modal,
  }: {
    modal: ModalRuntime<
      {
        title: string;
      },
      'save' | 'cancel'
    >;
  } = $props();
</script>

<div class="hello">
  <div class="header">{modal.props.title}</div>
  <div class="actions">
    <Button label="Cancel" onClick={() => modal.resolve('cancel')} />
    <Button label="Save" onClick={() => modal.resolve('save')} />
  </div>
</div>

<style lang="scss">
  @use 'sass:color';
  .hello {
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
