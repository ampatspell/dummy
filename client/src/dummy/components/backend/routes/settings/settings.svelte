<script lang="ts">
  import Section from '$dummy/components/dark/section/section.svelte';
  import Cell from '$dummy/components/dark/table/cell.svelte';
  import Content from '$dummy/components/dark/table/content.svelte';
  import Row from '$dummy/components/dark/table/row.svelte';
  import Table from '$dummy/components/dark/table/table.svelte';
  import LucideSettings from '$dummy/components/icons/lucide--settings.svelte';
  import type { Snippet } from 'svelte';

  let {
    route: current,
    children,
  }: {
    route: string;
    children: Snippet;
  } = $props();
</script>

{#snippet row(label: string, route: string)}
  <Cell {route} isSelected={current.startsWith(route)}>
    <Row>
      <Content>
        {label}
      </Content>
    </Row>
  </Cell>
{/snippet}

{#snippet sidebar()}
  <Table>
    {@render row('Users', '/backend/settings/users')}
  </Table>
{/snippet}

<Section title="Settings" icon={LucideSettings} {sidebar}>
  {@render children()}
</Section>
