<script lang="ts">
  import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
    import Placeholder from '$lib/components/placeholder.svelte';
  import type { HamsterBlockModel } from './models.svelte';

  let props: { block: BlockModel } = $props();
  let block = $derived(props.block as HamsterBlockModel);
</script>

<Placeholder>
  <div class="hamster">
    <div class="icon">🐹</div>
    <div class="message">{block.greeting.value}</div>
  </div>
</Placeholder>

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
