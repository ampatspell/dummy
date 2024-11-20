<script lang="ts" generics="T">
  import LucideCircleArrowRight from '$dummy/components/icons/lucide--circle-arrow-right.svelte';
  import type { Property } from '$dummy/lib/utils/property.svelte';
  import type { Snippet } from 'svelte';
  import Dropdown from '../dropdown/dropdown.svelte';
  import Item from '../dropdown/item.svelte';
  import Icon from '../icon.svelte';
  import Column from './column.svelte';
  import Row from './row.svelte';

  let {
    label,
    property,
    items,
    placeholder = 'Not selected',
    routeFor,
    item,
  }: {
    label: string;
    property: Property<T | undefined>;
    items: readonly T[];
    placeholder?: string;
    routeFor?: (value: T) => string | undefined;
    item: Snippet<[value: T]>;
  } = $props();

  let selected = $derived(property.value);
  let onSelect = (value: T | undefined) => property.update(value);

  let route = $derived.by(() => {
    if (selected) {
      return routeFor?.(selected);
    }
  });
</script>

{#snippet _item(value?: T, isSelected?: boolean)}
  <Item {isSelected}>
    {#if value !== undefined}
      {@render item(value)}
    {:else}
      {placeholder}
    {/if}
  </Item>
{/snippet}

<Row>
  <Column {label} flex={true}>
    <div class="content">
      <Dropdown {selected} {items} {onSelect} item={_item} />
      {#if route}
        <Icon icon={LucideCircleArrowRight} {route} />
      {/if}
    </div>
  </Column>
</Row>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }
</style>
