<script lang="ts">
  import Dark from '$lib/dark/dark.svelte';
  import Create from './create.svelte';

  let { label, isEditable }: { label: string; isEditable: boolean } = $props();
</script>

<Dark>
  <div class="placeholder">
    <div class="label">{label}</div>

    {#if isEditable}
      <div class="editable">
        <Create />
      </div>
    {/if}
  </div>
</Dark>

<style lang="scss">
  .placeholder {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    gap: 10px;
  }
</style>
