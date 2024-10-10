<script lang="ts">
  import type { BlockModel } from './models/blocks/block.svelte';

  let { block }: { block: BlockModel } = $props();

  $effect(() => {
    console.log(block._data);
  });

  let definition = $derived(block.definition);
  let Component = $derived(definition?.component);
</script>

<div class="block">
  <Component />
</div>

<style lang="scss">
  .block {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
