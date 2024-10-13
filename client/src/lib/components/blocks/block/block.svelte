<script lang="ts">
  import type { BlockModel } from './models/block.svelte';

  let {
    block,
  }: {
    block: BlockModel;
  } = $props();

  let Component = $derived(block.component);
</script>

<div class="block">
  <Component {block} />
</div>

<style lang="scss">
  .block {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
