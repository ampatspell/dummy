<script lang="ts">
  import Button from '$base/components/dark/button.svelte';
  import { getFormContext } from '../form.svelte';

  let {
    label,
  }: {
    label: string;
  } = $props();

  let context = getFormContext();
  let isDisabled = $derived(context.isDisabled);
  let onClick = async () => {
    await context.onSave();
  };
</script>

<div class="save">
  <Button {label} {isDisabled} {onClick} />
</div>

<style lang="scss">
  .save {
    display: flex;
    flex-direction: column;
  }
</style>
