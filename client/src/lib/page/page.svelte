<script lang="ts">
  import type { PageDefinition } from '../types';
  import Block from './block.svelte';

  let { definition }: { definition: PageDefinition } = $props();
  let block = $derived(definition.block);
</script>

<div class="page">
  <Block {block} />
</div>

<style lang="scss">
  .page {
    flex: 1;
  }
</style>
