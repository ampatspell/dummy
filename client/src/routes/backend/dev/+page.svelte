<script lang="ts">
  import Button from '$base/components/dark/button.svelte';
  import { getModalsContext } from '$base/components/dark/modals/base/context.svelte';
  import { relativeToBottomLeft } from '$base/components/dark/modals/base/placement/relative-to/relative-to.svelte';
  import { getter } from '$base/lib/utils/options';
  import First from './first.svelte';

  let modals = getModalsContext();

  let button = $state<HTMLDivElement>();

  let onClick = async () => {
    await modals.open({
      component: First,
      props: {
        title: 'First',
      },
      cancel: { ok: false },
      placement: relativeToBottomLeft({
        relativeTo: getter(() => button),
        offset: {
          x: 0,
          y: 2,
        },
      }),
    });
  };
</script>

<div class="page">
  <div class="wrapper" bind:this={button}>
    <Button label="Open" {onClick} />
  </div>
</div>

<style lang="scss">
  .page {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    > .wrapper {
      width: min-content;
    }
  }
</style>
