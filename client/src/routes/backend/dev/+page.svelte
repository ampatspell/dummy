<script lang="ts">
  import Button from '$base/components/dark/button.svelte';
  import { getModalsContext } from '$base/components/dark/modals/models/context.svelte';
  import First from './first.svelte';

  let modals = getModalsContext();

  let onClick = async () => {
    await modals.open({
      component: First,
      props: {
        title: 'First',
      },
      cancel: { ok: false },
    });
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
