<script lang="ts">
  import Button from '$lib/dark/button.svelte';
  import Icon from '$lib/dark/icon.svelte';
  import LucideCircleMinus from '$lib/icons/lucide--circle-minus.svelte';
  import LucideCirclePlus from '$lib/icons/lucide--circle-plus.svelte';
  import type { ValuesWithUnitModel, ValueWithUnitModel } from '$lib/page/models/blocks/block/block.svelte';
  import Column from './column.svelte';
  import Row from './row.svelte';

  let {
    label,
    name,
    values,
  }: {
    label: string;
    name: string;
    values: ValuesWithUnitModel;
  } = $props();

  const onAdd = () => values.add();
  const onRemove = (value: ValueWithUnitModel) => () => value.delete();
</script>

<Row>
  <Column {label}>
    <div class="content">
      {#if values}
        <div class="values">
          {#each values.values as value}
            <div class="value">
              <div class="content">
                {value.style}
              </div>
              <Icon icon={LucideCircleMinus} onClick={onRemove(value)} />
            </div>
          {/each}
        </div>
      {/if}
      <div class="add">
        <Icon icon={LucideCirclePlus} onClick={onAdd} />
      </div>
    </div>
  </Column>
</Row>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    > .values {
      > .value {
        height: 24px;
        display: flex;
        flex-direction: row;
        align-items: center;
        > .content {
          flex: 1;
        }
      }
    }
    > .add {
      height: 24px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
  }
</style>
