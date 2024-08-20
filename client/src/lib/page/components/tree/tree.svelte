<script lang="ts">
  import Card from '$lib/dark/card.svelte';
  import Dark from '$lib/dark/dark.svelte';
</script>

<Dark>
  <Card type="left">
    <div class="tree">tree</div>
  </Card>
</Dark>

<style lang="scss">
  .tree {
    flex: 1;
    width: 200px;
  }
</style>
