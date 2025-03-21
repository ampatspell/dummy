<script lang="ts">
  import LucideCircleArrowRight from '$dummy/components/icons/lucide--circle-arrow-right.svelte';
  import LucideCirclePlus from '$dummy/components/icons/lucide--circle-plus.svelte';
  import LucideTrash_2 from '$dummy/components/icons/lucide--trash-2.svelte';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import { PageBaseModel } from '$dummy/lib/pages/page.svelte';
  import { PagesModel } from '$dummy/lib/pages/pages.svelte';
  import { removeObjectAt } from '$dummy/lib/utils/array';
  import type { Property } from '$dummy/lib/utils/property.svelte';
  import Dropdown from '../dropdown/dropdown.svelte';
  import Item from '../dropdown/item.svelte';
  import Icon from '../icon.svelte';
  import Column from './column.svelte';
  import Row from './row.svelte';

  let { label, property }: { label: string; property: Property<string[]> } = $props();
  let value = $derived(property.value ?? []);

  let pages = PagesModel.build();
  $effect(() => subscribe(pages));

  class Model {
    readonly id: string;
    readonly idx: number;

    constructor(id: string, idx: number) {
      this.id = id;
      this.idx = idx;
    }

    readonly page = $derived.by(() => pages.byId(this.id));

    readonly route = $derived.by(() => {
      let page = this.page;
      if (page) {
        return `/backend/pages/${page.id}`;
      }
    });

    onSelect(page: PageBaseModel | undefined) {
      let id = page?.id ?? '';
      value[this.idx] = id;
      property.update([...value]);
    }

    onRemove() {
      removeObjectAt(value, this.idx);
      property.update([...value]);
    }
  }

  let items = $derived(value.map((id, idx) => new Model(id, idx)));

  let onAdd = () => {
    property.update([...value, '']);
  };

  let onSelect = (model: Model) => (page: PageBaseModel | undefined) => {
    model.onSelect(page);
  };

  let onRemove = (model: Model) => () => {
    model.onRemove();
  };
</script>

{#snippet item(page?: PageBaseModel, isSelected?: boolean)}
  <Item {isSelected}>
    {#if page}
      <div class="item">
        <div class="name">{page.name}</div>
        <div class="path">{page.path}</div>
      </div>
    {:else}
      Page not selected
    {/if}
  </Item>
{/snippet}

<Row>
  <Column {label} flex={true}>
    <div class="content">
      <div class="rows">
        {#each items as model}
          <div class="row">
            <Dropdown selected={model.page} items={pages.all} onSelect={onSelect(model)} {item} />
            {#if model.route}
              <Icon icon={LucideCircleArrowRight} route={model.route} />
            {/if}
            <Icon icon={LucideTrash_2} onClick={onRemove(model)} />
          </div>
        {/each}
      </div>
      <Icon icon={LucideCirclePlus} onClick={onAdd} />
    </div>
  </Column>
</Row>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    gap: 5px;
    > .rows {
      display: flex;
      flex-direction: column;
      gap: 2px;
      > .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
      }
    }
  }
  .item {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 5px;
    > .path {
      color: var(--dark-faded-color-1);
    }
  }
</style>
