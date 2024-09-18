<script lang="ts">
  import Icon from '$lib/dark/icon.svelte';
  import LucideCirclePlus from '$lib/icons/lucide--circle-plus.svelte';
  import type { ValuesWithUnitModel } from '$lib/page/models/blocks/block/block.svelte';
  import Column from '../column.svelte';
  import Row from '../row.svelte';
  import Value from './value.svelte';

  let {
    label,
    values,
  }: {
    label: string;
    values: ValuesWithUnitModel;
  } = $props();

  let onAdd = () => values.add();
</script>

<Row>
  <Column {label}>
    <div class="content">
      {#if values}
        {#each values.values as model}
          <Value {model} />
        {/each}
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
    gap: 1px;
    > .add {
      height: 24px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
  }
</style>
