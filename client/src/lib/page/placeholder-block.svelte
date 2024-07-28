<script lang="ts">
  import type { PlaceholderBlockDefinition } from "$lib/types";
  import { valueWithUnitDefinitionToStyleValue } from "$lib/utils";

  let { block }: { block: PlaceholderBlockDefinition } = $props();
  let width = $derived(valueWithUnitDefinitionToStyleValue(block.width));
  let height = $derived(valueWithUnitDefinitionToStyleValue(block.height));
</script>

<div class="placeholder" style:--width={width} style:--height={height}>

</div>

<style lang="scss">
  .placeholder {
    width: var(--width);
    height: var(--height);

    $a: fade-out(red, 0.97);
    $b: fade-out(red, 0.94);
    $step: 10px;
    background: repeating-linear-gradient(45deg, $a, $a $step, $b $step, $b $step * 2);
  }
</style>
