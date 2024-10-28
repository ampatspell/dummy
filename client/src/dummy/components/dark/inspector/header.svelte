<script lang="ts">
  import Column from './column.svelte';
  import Row from './row.svelte';
  let { title }: { title: string } = $props();
</script>

<Row>
  <Column>
    <div class="header">
      <div class="title">{title}</div>
    </div>
  </Column>
</Row>

<style lang="scss">
  .header {
    > .title {
      font-weight: 600;
    }
  }
</style>
