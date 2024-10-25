<script lang="ts">
  import Button, { type ButtonType } from './button.svelte';

  let {
    isDisabled,
    isMultiple,
    type,
    onFiles,
  }: {
    isDisabled?: boolean;
    isMultiple?: boolean;
    type?: ButtonType;
    files: File[];
    onFiles: (files: File[]) => void;
  } = $props();

  let input = $state<HTMLInputElement>();

  let multiple = $derived(isMultiple ?? true);

  let onchange = (e: Event) => {
    if (input) {
      let files = [...input.files!];
      input.value = '';
      onFiles(files);
    }
  };

  let onClick = () => {
    input?.click();
  };
</script>

<div class="files">
  <Button label="Choose files" {isDisabled} {onClick} {type} />
  <input class="input" type="file" bind:this={input} {multiple} {onchange} />
</div>

<style lang="scss">
  .files {
    > .input {
      display: none;
    }
  }
</style>
