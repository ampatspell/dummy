<script lang="ts">
  let {
    isDisabled,
    value,
    onEnter,
    onInput,
  }: {
    isDisabled?: boolean;
    value?: string;
    onEnter?: (value: string) => void;
    onInput?: (value: string) => void;
  } = $props();

  let targetAsInput = (e: Event) => {
    return e.target as HTMLInputElement;
  };

  let onkeyup = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && onEnter) {
      let input = targetAsInput(e);
      onEnter(input.value);
      input.blur();
    }
  };

  let onblur = (e: Event) => {
    let input = targetAsInput(e);
    input.value = value ?? '';
  };

  let oninput = (e: Event) => {
    let input = targetAsInput(e);
    onInput?.(input.value);
  };

  let disabled = $derived(isDisabled);
</script>

<input type="text" class="input" {disabled} {value} {oninput} {onkeyup} {onblur} />

<style lang="scss">
  .input {
    width: 100%;
    outline: none;
    border: 1px solid var(--dark-border-color-1);
    padding: 5px 5px;
    border-radius: 3px;
  }
</style>
