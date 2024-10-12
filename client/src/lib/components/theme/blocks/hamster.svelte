<script lang="ts">
</script>

<div class="hamster">
  <div class="icon">🐹</div>
  <div class="message">Hey there</div>
</div>

<style lang="scss">
  .hamster {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > .icon {
      font-size: 64px;
    }
    > .message {
      font-weight: 600;
    }
  }
</style>
