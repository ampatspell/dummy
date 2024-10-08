<script lang="ts">
  import Dark from '$lib/dark/dark.svelte';

  let { label }: { label: string } = $props();
</script>

<Dark>
  <div class="placeholder">
    <div class="label">{label}</div>
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
    > .label {
      font-weight: 600;
    }
  }
</style>
