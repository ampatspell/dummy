<script lang="ts">
  import type { BlockModel } from '../models/blocks/block/block.svelte';

  let { model }: { model: BlockModel } = $props();
</script>

<div class="block">
  {model}
</div>
