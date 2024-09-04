<script lang="ts">
  import type { VoidCallback } from '$lib/utils/types';

  let { label, isDisabled, onClick }: { label: string; isDisabled?: boolean; onClick: VoidCallback } = $props();

  let onclick = () => {
    onClick();
  };
</script>

<button class="button" disabled={isDisabled ?? false} {onclick}>{label}</button>

<style lang="scss">
  .button {
    appearance: none;
    outline: none;
    background: var(--dark-color);
    color: var(--dark-white-color);
    font-family: var(--dark-font-family);
    font-size: var(--dark-font-size);
    width: 100%;
    font-weight: 600;
    line-height: 14px;
    padding: 3px 8px;
    border-radius: 3px;
  }
</style>
