<script lang="ts">
  let { message }: { message: string } = $props();
</script>

<div class="placeholder">
  {message}
</div>

<style lang="scss">
  .placeholder {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
