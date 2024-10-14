<script lang="ts">
  import Icon from '$base/components/dark/icon.svelte';
  import LucideFileTerminal from '$base/components/icons/lucide--file-terminal.svelte';
</script>

<div class="page">
  <div class="content">
    <div class="row"><Icon icon={LucideFileTerminal} size="large" /></div>
    <div class="row">Dummy backend</div>
  </div>
</div>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
  }
</style>
