<script lang="ts">
  import Dropdown from '$lib/dark/dropdown/dropdown.svelte';
  import Icon from '$lib/dark/icon.svelte';
  import Input from '$lib/dark/input.svelte';
  import LucideCircleMinus from '$lib/icons/lucide--circle-minus.svelte';
  import type { ValueWithUnitModel } from '$lib/page/models/blocks/block/block.svelte';
  import { getter } from '$lib/utils/options';
  import { numberToString } from '$lib/utils/transform/number-to-string';
  import { Transformer } from '$lib/utils/transform/transform.svelte';
  import { Units, type Unit } from '$lib/utils/types';

  let {
    model,
  }: {
    model: ValueWithUnitModel;
  } = $props();

  let onRemove = () => model.delete();

  let value = new Transformer({
    value: getter(() => model.value),
    update: (value) =>
      model.update((data) => {
        data.value = value;
      }),
    target: numberToString(),
  });

  let onUnit = (unit: Unit) => {
    model.update((data) => {
      data.unit = unit;
    });
  };
</script>

<div class="value">
  <div class="content">
    <div class="input">
      <Input value={value.target.value} onEnter={value.target.update} />
    </div>
    <div class="dropdown">
      <Dropdown models={Units} selected={model.unit} onSelect={onUnit}>
        {#snippet children({ model })}
          {model}
        {/snippet}
      </Dropdown>
    </div>
  </div>
  <Icon icon={LucideCircleMinus} onClick={onRemove} />
</div>

<style lang="scss">
  .value {
    height: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    > .content {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;
      > .dropdown {
        width: 32px;
      }
    }
  }
</style>
