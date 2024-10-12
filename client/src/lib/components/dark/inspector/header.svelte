<script lang="ts">
  let { title }: { title: string } = $props();
</script>

<div class="header">
  <div class="title">{title}</div>
</div>

<style lang="scss">
  .header {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--dark-border-color-2);
    > .title {
      font-weight: 600;
      padding: 10px;
    }
  }
</style>
