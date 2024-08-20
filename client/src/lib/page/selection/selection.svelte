<script lang="ts">
  import Card from '$lib/dark/card.svelte';
  import Dark from '$lib/dark/dark.svelte';
</script>

<Dark>
  <Card type="right">
    <div class="selection">selection</div>
  </Card>
</Dark>

<style lang="scss">
  .selection {
    flex: 1;
    width: 200px;
  }
</style>
