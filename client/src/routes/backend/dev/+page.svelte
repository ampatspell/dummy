<script lang="ts">
  import Button from '$base/components/dark/button.svelte';
  import { openConfirmationModal } from '$base/components/dark/modals/confirmation/models';
  import { getModalsContext } from '$base/components/dark/modals/models/context.svelte';

  let modals = getModalsContext();

  let onClick = async () => {
    let res = await openConfirmationModal(modals, {
      title: 'Are you sure you want to delete this image?',
      confirm: 'Delete',
    });
    console.log(res);
  };
</script>

<div class="page">
  <Button label="Open" {onClick} />
</div>

<style lang="scss">
  .page {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
