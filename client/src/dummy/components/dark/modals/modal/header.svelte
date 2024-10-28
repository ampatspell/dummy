<script lang="ts">
  let { title }: { title: string } = $props();
</script>

<div class="header">
  <div class="title">{title}</div>
</div>

<style lang="scss">
  .header {
    > .title {
      font-weight: 600;
    }
  }
</style>
