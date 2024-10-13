<script lang="ts">
  import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
  import String from '$lib/components/blocks/block/value/string.svelte';

  let { block }: { block: BlockModel } = $props();
</script>

<div class="hamster">
  <div class="icon"><String {block} id="emoji" fallback="🐹" /></div>
  <div class="message"><String {block} id="greeting" /></div>
</div>

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
