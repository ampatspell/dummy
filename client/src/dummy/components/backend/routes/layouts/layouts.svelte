<script lang="ts">
  import type { Snippet } from 'svelte';
  import Add from '../../../dark/section/page/add.svelte';
  import Cell from '../../../dark/table/cell.svelte';
  import Table from '../../../dark/table/table.svelte';
  import Section from '../../../dark/section/section.svelte';
  import { goto } from '$app/navigation';
  import Row from '$dummy/components/dark/table/row.svelte';
  import Content from '$dummy/components/dark/table/content.svelte';
  import type { LayoutsModel } from '$dummy/lib/layouts/layouts.svelte';
  import { createNewLayout, type LayoutModel } from '$dummy/lib/layouts/layout.svelte';
  import LucideLayers from '$dummy/components/icons/lucide--layers.svelte';
  import Icon from '$dummy/components/dark/icon.svelte';
  import LucideCircleCheck from '$dummy/components/icons/lucide--circle-check.svelte';
  import Accessories from '$dummy/components/dark/table/accessories.svelte';

  let {
    id,
    layouts,
    route,
    children,
  }: {
    id?: string;
    layouts: LayoutsModel;
    route: (page: LayoutModel) => string;
    children: Snippet;
  } = $props();

  let onAdd = async () => {
    let model = await createNewLayout();
    await goto(route(model));
  };

  let isSelected = (layout: LayoutModel) => layouts.selected === layout;
</script>

{#snippet accessories()}
  <Add {onAdd} />
{/snippet}

{#snippet sidebar()}
  <Table>
    {#each layouts.all as layout}
      <Cell route={route(layout)} isSelected={layout.id === id}>
        <Row>
          <Content>
            {layout.name}
          </Content>
          {#if isSelected(layout)}
            <Accessories>
              <Icon icon={LucideCircleCheck} />
            </Accessories>
          {/if}
        </Row>
      </Cell>
    {/each}
  </Table>
{/snippet}

<Section title="Layouts" icon={LucideLayers} {sidebar} {accessories}>
  {#if layouts.isLoaded}
    {@render children()}
  {/if}
</Section>
