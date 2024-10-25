<script lang="ts">
  import Button from '$base/components/dark/button.svelte';
  import Modals from '$base/components/dark/modals/modals.svelte';
  import { createModalsContext } from '$base/components/dark/modals/models.svelte';
  import Hello from './hello.svelte';

  const modals = createModalsContext();

  let onClick = async () => {
    let res = await modals.open({
      component: Hello,
      props: {
        title: 'Hey there!',
      },
      cancel: 'cancel',
    });
    console.log('done', res);
  };
</script>

<div class="page">
  <Button label="Open" {onClick} />
</div>

<Modals />

<style lang="scss">
  .page {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
