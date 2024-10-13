<script lang="ts">
  import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
  import Placeholder from '$lib/components/placeholder.svelte';
  import type { IntroBlockModel } from './models.svelte';

  let props: { block: BlockModel } = $props();
  let block = $derived(props.block as IntroBlockModel);
</script>

<div class="intro">Intro</div>

<style lang="scss">
  .intro {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
